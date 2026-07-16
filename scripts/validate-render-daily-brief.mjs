import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const RENDERER = path.join(process.cwd(), "scripts", "render-daily-brief.mjs");
const FIXTURE_DIR = path.join(process.cwd(), "test-fixtures", "project-status");
const DAILY_BRIEFS_DIR = path.join(process.cwd(), "docs", "daily-briefs");

function listFiles(dir) {
  const files = [];

  function walk(current) {
    for (const entry of readdirSync(current)) {
      const fullPath = path.join(current, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        files.push(path.relative(dir, fullPath).replace(/\\/g, "/"));
      }
    }
  }

  walk(dir);
  return files.sort();
}

function runRenderer(fixtureName) {
  const fixturePath = path.join(FIXTURE_DIR, fixtureName);
  return runRendererArgs(["--status-file", fixturePath]);
}

function runRendererArgs(args) {
  return spawnSync(
    process.execPath,
    [RENDERER, ...args],
    {
      cwd: process.cwd(),
      encoding: "utf8",
    },
  );
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertIncludes(text, expected, context) {
  assert(
    text.includes(expected),
    `${context}: expected output to include ${JSON.stringify(expected)}`,
  );
}

function snapshotPath(writeDate) {
  return path.join(DAILY_BRIEFS_DIR, `${writeDate}.md`);
}

function findAvailableWriteDate() {
  for (let day = 1; day <= 28; day += 1) {
    const writeDate = `2099-12-${String(day).padStart(2, "0")}`;
    if (!existsSync(snapshotPath(writeDate))) {
      return writeDate;
    }
  }

  throw new Error("no available temporary write date found");
}

const beforeDailyBriefs = listFiles(DAILY_BRIEFS_DIR);
const createdSnapshots = [];

try {
  const validMultiple = runRenderer("valid-multiple-projects.md");
  assert(validMultiple.status === 0, "valid multiple projects should exit 0");
  assertIncludes(validMultiple.stdout, "# Daily Brief", "valid multiple projects");
  assertIncludes(validMultiple.stdout, "Alpha Project", "valid multiple projects");
  assertIncludes(validMultiple.stdout, "Beta Project", "valid multiple projects");

  const missingField = runRenderer("invalid-missing-field.md");
  assert(missingField.status === 1, "missing field fixture should exit 1");
  assertIncludes(
    missingField.stderr,
    "missing required field",
    "missing field fixture",
  );

  const badList = runRenderer("invalid-bad-list.md");
  assert(badList.status === 1, "bad list fixture should exit 1");
  assertIncludes(badList.stderr, "list", "bad list fixture");

  const blockedProject = runRenderer("valid-blocked-project.md");
  assert(blockedProject.status === 0, "blocked project fixture should exit 0");
  assertIncludes(blockedProject.stdout, "## 卡住 / blocked", "blocked project");
  assertIncludes(blockedProject.stdout, "Blocked Project", "blocked project");

  const defaultRun = spawnSync(process.execPath, [RENDERER], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  assert(defaultRun.status === 0, "default renderer run should exit 0");
  assertIncludes(defaultRun.stdout, "# Daily Brief", "default renderer run");
  assert(
    JSON.stringify(beforeDailyBriefs) === JSON.stringify(listFiles(DAILY_BRIEFS_DIR)),
    "default renderer run must not create docs/daily-briefs files",
  );

  const writeDate = findAvailableWriteDate();
  const writePath = snapshotPath(writeDate);
  const writeRun = runRendererArgs([
    "--status-file",
    path.join(FIXTURE_DIR, "valid-multiple-projects.md"),
    "--write-date",
    writeDate,
  ]);
  assert(writeRun.status === 0, "--write-date valid date should exit 0");
  if (existsSync(writePath)) {
    createdSnapshots.push(writePath);
  }
  assertIncludes(
    writeRun.stdout,
    `wrote docs/daily-briefs/${writeDate}.md`,
    "--write-date",
  );
  assert(existsSync(writePath), "--write-date should create the expected snapshot");
  const writtenSnapshot = readFileSync(writePath, "utf8");
  assertIncludes(
    writtenSnapshot,
    `# Daily Brief — ${writeDate}`,
    "written snapshot date header",
  );
  assertIncludes(
    writtenSnapshot,
    `- 日期：${writeDate}`,
    "written snapshot overview date",
  );
  assertIncludes(
    writtenSnapshot,
    "Alpha Project",
    "written snapshot",
  );

  const duplicateWrite = runRendererArgs([
    "--status-file",
    path.join(FIXTURE_DIR, "valid-multiple-projects.md"),
    "--write-date",
    writeDate,
  ]);
  assert(duplicateWrite.status === 1, "duplicate --write-date should exit 1");
  assertIncludes(duplicateWrite.stderr, "snapshot already exists", "duplicate write");

  const invalidDate = runRendererArgs(["--write-date", "2026-02-30"]);
  assert(invalidDate.status === 1, "invalid --write-date should exit 1");
  assertIncludes(invalidDate.stderr, "valid calendar date", "invalid date");

  const outputArg = runRendererArgs(["--output", "docs/daily-briefs/out.md"]);
  assert(outputArg.status === 1, "--output should exit 1");
  assertIncludes(outputArg.stderr, "--output is not supported", "--output");

  const invalidStatusDate = findAvailableWriteDate();
  const invalidStatusPath = snapshotPath(invalidStatusDate);
  const invalidStatusWrite = runRendererArgs([
    "--status-file",
    path.join(FIXTURE_DIR, "invalid-missing-field.md"),
    "--write-date",
    invalidStatusDate,
  ]);
  assert(invalidStatusWrite.status === 1, "invalid status write should exit 1");
  assertIncludes(
    invalidStatusWrite.stderr,
    "missing required field",
    "invalid status write",
  );
  assert(
    !existsSync(invalidStatusPath),
    "invalid status write must not create a snapshot",
  );
} finally {
  for (const filePath of createdSnapshots) {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }
}

const afterDailyBriefs = listFiles(DAILY_BRIEFS_DIR);
assert(
  JSON.stringify(beforeDailyBriefs) === JSON.stringify(afterDailyBriefs),
  "renderer validation must not create or remove docs/daily-briefs files",
);

console.log("render-daily-brief validation passed");
