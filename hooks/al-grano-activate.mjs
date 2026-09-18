// al-grano — SessionStart activation hook (portable / plugin install).
//
// On every session start:
//   1. Write flag file at $CLAUDE_CONFIG_DIR/.al-grano-active (default ~/.claude).
//   2. Emit the full al-grano ruleset as SessionStart context.
// Never blocks session start: any failure exits 0.
//
// Runs under Node so it works on macOS, Linux, and Windows.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

try {
  const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude");
  const flagPath = path.join(claudeDir, ".al-grano-active");

  // Write the active flag (best effort).
  try { fs.writeFileSync(flagPath, "on\n", { mode: 0o600 }); } catch {}

  // Resolve SKILL.md relative to this script, not a trusted env var.
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const skillPath = path.join(scriptDir, "..", "skills", "al-grano", "SKILL.md");
  if (!fs.existsSync(skillPath)) process.exit(0);

  const body = fs
    .readFileSync(skillPath, "utf8")
    .replace(/^---[^\S\r\n]*\r?\n[\s\S]*?\r?\n---[^\S\r\n]*(?:\r?\n|$)/, "")
    .replace(/(?:\r?\n)+$/, "");

  process.stdout.write(
    "AL-GRANO MODE ACTIVE. Ruleset below applies to every response. " +
      '"para al-grano" / "normal mode" turns it off for this session.\n\n' +
      body + "\n",
  );
} catch {
  process.exit(0);
}
