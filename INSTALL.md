# How to install

## Claude Code (standalone hooks — Ramon's live setup)

al-grano runs as two SessionStart / UserPromptSubmit hooks that read the canonical `SKILL.md` from this repo. Both fail open, so a broken or missing repo never blocks a session start.

1. Point `~/.claude/settings.json` `SessionStart` and `UserPromptSubmit` at the standalone hooks:
   ```json
   "SessionStart": [
     { "hooks": [ { "type": "command",
       "command": "\"$(command -v node)\" \"$HOME/.claude/hooks/al-grano-activate.js\"",
       "timeout": 5 } ] } ],
   "UserPromptSubmit": [
     { "hooks": [ { "type": "command",
       "command": "\"$(command -v node)\" \"$HOME/.claude/hooks/al-grano-tracker.js\"",
       "timeout": 5 } ] } ]
   ```
2. The standalone hooks (`~/.claude/hooks/al-grano-activate.js`, `al-grano-tracker.js`) read `~/Documents/al-grano/skills/al-grano/SKILL.md` as the source of truth, with an embedded fallback ruleset if the repo is unavailable.
3. Start a new session. You should see `AL-GRANO MODE ACTIVE` in the injected context.

## Claude Code (plugin)

Install the whole repo as a plugin. The portable hooks in `hooks/hooks.json` launch from `CLAUDE_PLUGIN_ROOT`:

```bash
claude plugin install https://github.com/Rsosa13/al-grano
```

## Codex

Codex loads `AGENTS.md` + skills. Reference `skills/al-grano/SKILL.md` from your workspace `AGENTS.md`, or symlink it into `~/.codex/skills/al-grano/`.

## Any other runtime

Upload or reference `skills/al-grano/SKILL.md`. The ruleset is self-contained. Activate with a line like: "Use the al-grano skill for this conversation."

## Turn it off

Say `para al-grano`, `stop al-grano`, or `normal mode`. The tracker removes the flag for the session. Next session re-activates.

## Uninstall

Revert the `SessionStart` / `UserPromptSubmit` entries in `~/.claude/settings.json` (a timestamped backup was saved as `settings.json.bak.pre-al-grano`), or `claude plugin uninstall al-grano`.
