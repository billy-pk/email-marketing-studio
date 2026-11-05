// PreToolUse hook for the Resend MCP tools.
// Exit 2 blocks the call and shows the reason on stderr. Exit 0 allows it.

const ALWAYS_BLOCKED = [
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
];
const CHECKED = ["send-email", "send-batch-emails"];

function block(reason) {
  console.error(`Blocked by send-guard: ${reason}`);
  process.exit(2);
}

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

// Turn "to" style values (string, list, or "Name <a@b.c>") into plain addresses.
function addressesOf(value) {
  if (value == null) return [];
  const items = Array.isArray(value) ? value : [value];
  return items.flatMap((item) => {
    if (typeof item !== "string") return [String(item)];
    return item.split(",").map((part) => {
      const m = part.match(/<([^>]*)>/);
      return (m ? m[1] : part).trim();
    });
  }).filter((a) => a !== "");
}

let call;
try {
  call = JSON.parse(await readStdin());
} catch {
  block("could not read the tool call, so it is not safe to allow.");
}

// Tool names look like mcp__resend__send-email.
const tool = String(call.tool_name ?? "").replace(/^mcp__resend__/, "");

if (ALWAYS_BLOCKED.includes(tool)) {
  block(`${tool} can reach whole lists of people. It is never allowed here.`);
}

if (CHECKED.includes(tool)) {
  const input = call.tool_input ?? {};
  // send-batch-emails holds a list of emails; send-email is a single one.
  const emails = Array.isArray(input) ? input
    : Array.isArray(input.emails) ? input.emails
    : [input];

  const mine = (process.env.MY_EMAIL ?? "").trim().toLowerCase();

  for (const email of emails) {
    for (const field of ["to", "cc", "bcc"]) {
      for (const address of addressesOf(email?.[field])) {
        const a = address.toLowerCase();
        if (a.endsWith("@resend.dev") || (mine !== "" && a === mine)) continue;
        block(`${address} (in "${field}") is not a @resend.dev address or your own email.`);
      }
    }
  }
}

process.exit(0);
