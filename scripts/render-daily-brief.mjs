import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_STATUS_PATH = path.join(
  process.cwd(),
  "docs",
  "project-status",
  "current-projects.md",
);

function parseArgs(argv) {
  if (argv.length === 0) {
    return { statusPath: DEFAULT_STATUS_PATH };
  }

  if (argv.length === 2 && argv[0] === "--status-file") {
    return { statusPath: path.resolve(process.cwd(), argv[1]) };
  }

  fail("usage: node scripts/render-daily-brief.mjs [--status-file path/to/file.md]");
}

const REQUIRED_FIELDS = [
  "project_name",
  "current_phase",
  "latest_done",
  "latest_pr",
  "latest_commit",
  "waiting_for",
  "next_action",
  "blocked",
  "do_not_do",
  "handoff_prompt",
];

const STRING_FIELDS = new Set([
  "project_name",
  "current_phase",
  "latest_done",
  "latest_pr",
  "latest_commit",
  "next_action",
  "handoff_prompt",
]);

const LIST_FIELDS = new Set(["waiting_for", "do_not_do"]);

function fail(message) {
  console.error(`render-daily-brief: ${message}`);
  process.exit(1);
}

function unquote(value, context) {
  const match = value.match(/^"(.*)"$/);
  if (!match) {
    throw new Error(`${context} must be a double-quoted string`);
  }
  return match[1];
}

function parseRecord(block, index) {
  const record = {};
  let currentListKey = null;

  const lines = block.replace(/\r\n/g, "\n").split("\n");

  lines.forEach((rawLine, lineIndex) => {
    const lineNumber = lineIndex + 1;
    const line = rawLine.trimEnd();

    if (line.trim() === "") {
      return;
    }

    const listItem = line.match(/^  - (.+)$/);
    if (listItem) {
      if (!currentListKey) {
        throw new Error(
          `record ${index}: line ${lineNumber} has a list item without a list field`,
        );
      }
      record[currentListKey].push(
        unquote(listItem[1], `record ${index}: line ${lineNumber}`),
      );
      return;
    }

    if (/^\s/.test(line)) {
      throw new Error(
        `record ${index}: line ${lineNumber} has unsupported indentation`,
      );
    }

    currentListKey = null;

    const field = line.match(/^([a-z_]+):(.*)$/);
    if (!field) {
      throw new Error(
        `record ${index}: line ${lineNumber} is not a supported key/value line`,
      );
    }

    const key = field[1];
    const rawValue = field[2].trim();

    if (Object.hasOwn(record, key)) {
      throw new Error(`record ${index}: duplicate field ${key}`);
    }

    if (STRING_FIELDS.has(key)) {
      if (!rawValue) {
        throw new Error(`record ${index}: field ${key} is empty`);
      }
      record[key] = unquote(rawValue, `record ${index}: field ${key}`);
      return;
    }

    if (LIST_FIELDS.has(key)) {
      if (rawValue === "[]") {
        record[key] = [];
        return;
      }
      if (rawValue !== "") {
        throw new Error(
          `record ${index}: field ${key} must be [] or a following list`,
        );
      }
      record[key] = [];
      currentListKey = key;
      return;
    }

    if (key === "blocked") {
      if (rawValue !== "true" && rawValue !== "false") {
        throw new Error(`record ${index}: field blocked must be true or false`);
      }
      record.blocked = rawValue === "true";
      return;
    }

    throw new Error(`record ${index}: unsupported field ${key}`);
  });

  return record;
}

function validateRecord(record, index) {
  const label = record.project_name || `record ${index}`;

  REQUIRED_FIELDS.forEach((field) => {
    if (!Object.hasOwn(record, field)) {
      throw new Error(`${label}: missing required field ${field}`);
    }
  });

  STRING_FIELDS.forEach((field) => {
    if (typeof record[field] !== "string" || record[field].trim() === "") {
      throw new Error(`${label}: field ${field} must be a non-empty string`);
    }
  });

  LIST_FIELDS.forEach((field) => {
    if (
      !Array.isArray(record[field]) ||
      record[field].some((item) => typeof item !== "string" || item.trim() === "")
    ) {
      throw new Error(`${label}: field ${field} must be a list of strings`);
    }
  });

  if (typeof record.blocked !== "boolean") {
    throw new Error(`${label}: field blocked must be boolean`);
  }
}

function extractRecords(markdown) {
  const blocks = [...markdown.matchAll(/```yaml\r?\n([\s\S]*?)```/g)].map(
    (match) => match[1],
  );

  if (blocks.length === 0) {
    throw new Error("no ```yaml Project Status records found");
  }

  const records = blocks.map((block, index) => parseRecord(block, index + 1));
  records.forEach((record, index) => validateRecord(record, index + 1));
  return records;
}

function formatList(items) {
  if (items.length === 0) {
    return "- None known from Project Status records";
  }
  return items.map((item) => `- ${item}`).join("\n");
}

function tableRow(cells) {
  return `| ${cells.map((cell) => String(cell).replace(/\n/g, " ")).join(" | ")} |`;
}

function renderBrief(records) {
  const today = new Date().toISOString().slice(0, 10);
  const ready = records.filter(
    (record) => !record.blocked && record.next_action.trim() !== "",
  );
  const watched = records.filter(
    (record) => !record.blocked && record.waiting_for.length > 0,
  );
  const blocked = records.filter((record) => record.blocked);

  const lines = [];

  lines.push(`# Daily Brief — ${today}`);
  lines.push("");
  lines.push("## 今日總覽");
  lines.push("");
  lines.push(`- 日期：${today}`);
  lines.push("- 產生者：scripts/render-daily-brief.mjs");
  lines.push("- 使用的 Project Status records：");
  records.forEach((record) => lines.push(`  - ${record.project_name}`));
  lines.push(`- 可動工專案數：${ready.length}`);
  lines.push(`- 觀察中專案數：${watched.length}`);
  lines.push(`- blocked 專案數：${blocked.length}`);
  lines.push("");

  lines.push("## 可動工");
  lines.push("");
  lines.push("| 專案 | 可動工原因 | 建議動作 | 需要確認 |");
  lines.push("| --- | --- | --- | --- |");
  if (ready.length === 0) {
    lines.push(
      tableRow([
        "None known",
        "No unblocked project with a next_action was found.",
        "None",
        "Review Project Status records.",
      ]),
    );
  } else {
    ready.forEach((record) => {
      lines.push(
        tableRow([
          record.project_name,
          "`blocked: false` and `next_action` is present.",
          record.next_action,
          record.waiting_for.length > 0
            ? record.waiting_for.join("; ")
            : "None known from Project Status records",
        ]),
      );
    });
  }
  lines.push("");

  lines.push("## 觀察中");
  lines.push("");
  lines.push("| 專案 | 觀察原因 | 目前階段 | 何時重新檢查 |");
  lines.push("| --- | --- | --- | --- |");
  if (watched.length === 0) {
    lines.push(
      tableRow([
        "None known",
        "No waiting items found on unblocked projects.",
        "None",
        "Next Project Status refresh.",
      ]),
    );
  } else {
    watched.forEach((record) => {
      lines.push(
        tableRow([
          record.project_name,
          record.waiting_for.join("; "),
          record.current_phase,
          "After the waiting items are reviewed or updated.",
        ]),
      );
    });
  }
  lines.push("");

  lines.push("## 等待外部資訊");
  lines.push("");
  lines.push("| 專案 | 等待事項 | 等待來源 | 對下一步的影響 |");
  lines.push("| --- | --- | --- | --- |");
  const waitingRows = records.flatMap((record) =>
    record.waiting_for.map((item) => [record, item]),
  );
  if (waitingRows.length === 0) {
    lines.push(
      tableRow([
        "None known",
        "None known from Project Status records",
        "None",
        "No waiting impact known.",
      ]),
    );
  } else {
    waitingRows.forEach(([record, item]) => {
      lines.push(
        tableRow([
          record.project_name,
          item,
          "Project Status record",
          "Review before treating the next action as ready to execute.",
        ]),
      );
    });
  }
  lines.push("");

  lines.push("## 卡住 / blocked");
  lines.push("");
  lines.push("| 專案 | 卡住原因 | 解除條件 | 不應執行事項 |");
  lines.push("| --- | --- | --- | --- |");
  if (blocked.length === 0) {
    lines.push(
      tableRow([
        "None known",
        "All Project Status records show `blocked: false`.",
        "None known from Project Status records",
        "Keep all `do_not_do` guardrails in force.",
      ]),
    );
  } else {
    blocked.forEach((record) => {
      lines.push(
        tableRow([
          record.project_name,
          record.waiting_for.join("; ") || "Not specified",
          "Update the Project Status record when unblocked.",
          record.do_not_do.join("; "),
        ]),
      );
    });
  }
  lines.push("");

  lines.push("## 各專案狀態摘要");
  records.forEach((record) => {
    lines.push("");
    lines.push(`### ${record.project_name}`);
    lines.push("");
    lines.push(`- current_phase：${record.current_phase}`);
    lines.push(`- latest_done：${record.latest_done}`);
    lines.push(`- latest_pr：${record.latest_pr}`);
    lines.push(`- latest_commit：${record.latest_commit}`);
    lines.push("- waiting_for：");
    lines.push(formatList(record.waiting_for));
    lines.push(`- next_action：${record.next_action}`);
    lines.push(`- blocked：${record.blocked}`);
    lines.push("- do_not_do：");
    lines.push(formatList(record.do_not_do));
  });
  lines.push("");

  lines.push("## 今日建議優先順序");
  lines.push("");
  const priorities = [...records].sort((a, b) => {
    if (a.blocked !== b.blocked) {
      return a.blocked ? 1 : -1;
    }
    return a.waiting_for.length - b.waiting_for.length;
  });
  priorities.forEach((record, index) => {
    lines.push(`${index + 1}. ${record.project_name}`);
    lines.push(`   - 理由：blocked=${record.blocked}; waiting_for=${record.waiting_for.length}`);
    lines.push(`   - 建議下一步：${record.next_action}`);
    lines.push(
      `   - 必須遵守的 guardrail：${
        record.do_not_do[0] || "None known from Project Status records"
      }`,
    );
  });
  lines.push("");

  lines.push("## Do Not Do guardrails");
  lines.push("");
  lines.push("| 專案 | Guardrail |");
  lines.push("| --- | --- |");
  records.forEach((record) => {
    record.do_not_do.forEach((item) => {
      lines.push(tableRow([record.project_name, item]));
    });
  });
  lines.push("");

  lines.push("## Handoff prompt 區塊");
  records.forEach((record) => {
    lines.push("");
    lines.push("```text");
    lines.push(`Project: ${record.project_name}`);
    lines.push(`Handoff prompt: ${record.handoff_prompt}`);
    lines.push("```");
  });
  lines.push("");

  return `${lines.join("\n")}\n`;
}

try {
  const { statusPath } = parseArgs(process.argv.slice(2));
  const markdown = await readFile(statusPath, "utf8");
  const records = extractRecords(markdown);
  process.stdout.write(renderBrief(records));
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
