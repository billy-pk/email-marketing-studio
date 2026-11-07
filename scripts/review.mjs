// Usage: node scripts/review.mjs <campaign-folder>
// Runs Claude Code headless, saves review/findings.json, exits 1 on any high finding.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign-folder>");
  process.exit(2);
}

const schema = readFileSync("review/findings.schema.json", "utf8");
let prompt = `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

// If the last review was for this same folder, tell Claude what it already found.
const FINDINGS_PATH = "review/findings.json";
if (existsSync(FINDINGS_PATH)) {
  try {
    const previous = JSON.parse(readFileSync(FINDINGS_PATH, "utf8"));
    if (previous.folder === folder && Array.isArray(previous.findings)) {
      prompt +=
        `\n\nEarlier findings:\n${JSON.stringify(previous.findings, null, 2)}\n\n` +
        "These are findings from the last review. Report only problems that are new or still not fixed. Don't repeat ones that have been fixed.";
    }
  } catch {
    // An unreadable old file just means a fresh review.
  }
}

const run = spawnSync(
  "claude",
  ["-p", prompt, "--output-format", "json", "--json-schema", schema, "--allowedTools", "Read,Glob,Grep"],
  { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
);

if (run.error || run.status !== 0) {
  console.error(
    `claude failed (exit ${run.status}):`,
    run.error?.message ?? [run.stderr, run.stdout].filter(Boolean).join("\n"),
  );
  process.exit(2);
}

let out;
try {
  out = JSON.parse(run.stdout);
} catch {
  console.error("Could not parse claude output as JSON:\n" + run.stdout);
  process.exit(2);
}

// Output may be one object, or a list whose last item is the result.
const result = Array.isArray(out) ? out[out.length - 1] : out;
const data = result?.structured_output;
if (!data || !Array.isArray(data.findings)) {
  console.error("No structured_output in result:\n" + JSON.stringify(result, null, 2));
  process.exit(2);
}

writeFileSync(FINDINGS_PATH, JSON.stringify({ folder, findings: data.findings }, null, 2) + "\n");

const count = (s) => data.findings.filter((f) => f.severity === s).length;
const high = count("high");
console.log(
  `${folder}: ${data.findings.length} findings (${high} high, ${count("medium")} medium, ${count("low")} low) -> review/findings.json`,
);
process.exit(high > 0 ? 1 : 0);
