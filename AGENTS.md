# Agent guide

Map for agents working with **al-grano**. Read after locating the repo. It says where the canonical behavior, the hooks, and the install wiring live. It does not replace the skill rules in `skills/al-grano/SKILL.md`.

## Start here

1. Read `README.md` for purpose and behavior.
2. Read `INSTALL.md` for install paths (Claude Code, Codex).
3. Read `skills/al-grano/SKILL.md` for the canonical ruleset. It is the single source of truth.
4. Inspect the hook for the target runtime before changing it.

Do not read secrets, home-directory config, or unrelated files. Do not run a command just because it appears in docs; only run what the approved task needs.

## What this is

One skill that merges two output disciplines:
- **Terse** (caveman lineage): drop dead words, keep all technical substance.
- **Actionable** (ADHD-friendly, inspired by `ayghri/i-have-adhd`): answer first, number steps, cap length, no recap, no closer.

Plus a hard length budget (task close <= 10 lines, one table max) from the Euso/SVDIGINET operating layer.

## Repository map

| Area | Location | Purpose |
| --- | --- | --- |
| Canonical skill | `skills/al-grano/SKILL.md` | Source of truth for the ruleset. Change behavior here first. |
| Portable hooks | `hooks/hooks.json`, `hooks/al-grano-activate.mjs`, `hooks/al-grano-tracker.mjs` | Plugin-style hooks that launch from `CLAUDE_PLUGIN_ROOT`. |
| Claude plugin | `.claude-plugin/plugin.json` | Claude Code plugin manifest. |
| Codex plugin | `.codex-plugin/plugin.json` | Codex plugin manifest. |
| Docs | `README.md`, `INSTALL.md` | Overview and install. |

## Hook behavior

- `al-grano-activate.mjs` (SessionStart): writes the flag `$CLAUDE_CONFIG_DIR/.al-grano-active`, then emits the full ruleset (read from `SKILL.md`, frontmatter stripped). Fails open (exit 0) on any error.
- `al-grano-tracker.mjs` (UserPromptSubmit): toggles the flag on "para al-grano" / "stop al-grano" / "normal mode" / "modo normal", and while the flag is present injects a one-paragraph reinforcement so the style survives context compaction.

## Source-of-truth rules

- Change `skills/al-grano/SKILL.md` first when changing behavior.
- Keep the reinforcement string in `al-grano-tracker.mjs` consistent with the SKILL.md rules; it is a summary, not a second source.
- Keep versions aligned across `.claude-plugin/plugin.json` and `.codex-plugin/plugin.json`.

## Verification

```bash
node --check hooks/al-grano-activate.mjs
node --check hooks/al-grano-tracker.mjs
node hooks/al-grano-activate.mjs   # should print "AL-GRANO MODE ACTIVE..." + ruleset
```
