import { spawnSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
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
  return spawnSync(
    process.execPath,
    [RENDERER, "--status-file", fixturePath],
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

const beforeDailyBriefs = listFiles(DAILY_BRIEFS_DIR);

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

const afterDailyBriefs = listFiles(DAILY_BRIEFS_DIR);
assert(
  JSON.stringify(beforeDailyBriefs) === JSON.stringify(afterDailyBriefs),
  "renderer validation must not create or remove docs/daily-briefs files",
);

console.log("render-daily-brief validation passed");
