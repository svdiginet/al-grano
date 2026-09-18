// al-grano — UserPromptSubmit hook (portable / plugin install).
//
// Two jobs each user turn:
//   1. Toggle: "para al-grano" / "stop al-grano" / "normal mode" removes the flag
//      (off this session); "activate al-grano" / "al grano" re-adds it.
//   2. Per-turn reinforcement: when the flag is present, emit a short reminder so
//      the style survives context compaction and competing style injections.
// Never blocks: any failure emits nothing and exits 0.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude");
const flagPath = path.join(claudeDir, ".al-grano-active");

let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  try {
    const data = JSON.parse(input || "{}");
    const prompt = (data.prompt || "").trim().toLowerCase();

    const off = /\b(para|stop|disable|deactivate|turn off|quita)\b.*\bal[-\s]?grano\b/.test(prompt) ||
      /\bal[-\s]?grano\b.*\b(off|stop|para|quita)\b/.test(prompt) ||
      /\bnormal mode\b/.test(prompt) ||
      /\bmodo normal\b/.test(prompt);
    const on = !off && (/\b(activa|activate|enable|turn on|start|dale)\b.*\bal[-\s]?grano\b/.test(prompt) ||
      /^\/?al[-\s]?grano\b/.test(prompt));

    if (off) { try { fs.unlinkSync(flagPath); } catch {} }
    else if (on) { try { fs.writeFileSync(flagPath, "on\n", { mode: 0o600 }); } catch {} }

    let active = false;
    try { active = fs.statSync(flagPath).isFile(); } catch {}

    if (active) {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "UserPromptSubmit",
          additionalContext:
            "AL-GRANO MODE ACTIVE. Answer first (command/path/decision on line 1). " +
            "Drop dead words. Task close <=10 lines, one table max, no recap, no closer. " +
            "Findings one line each; detail to commit/devlog. Code/commits/security: write normal.",
        },
      }));
    }
  } catch {
    // silent
  }
});
