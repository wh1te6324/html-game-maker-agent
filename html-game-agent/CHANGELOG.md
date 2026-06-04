# Changelog

## 0.4.0

- Integrated a compact Claude-Code-Game-Studios-style generation pipeline into the agent instructions.
- Added `STUDIO_WORKFLOW.md` and included it in prompt compilation.
- Removed old fixed-template-oriented test prompts and replaced them with semantic studio, routing, polish, and package-contract tests.
- Strengthened the art direction requirements for more polished, prompt-specific games.

## 0.3.0

- Added a Claude-Code-Game-Studios-style internal studio pass before coding.
- Required runtime selection from semantic player verbs, entities, HUD, fail pressure, and progression instead of fixed genre categories.
- Added explicit anti-template guidance so unrelated prompts do not collapse into the same generic loop.

## 0.2.0

- Strengthened prompt-first game generation for StoryClaw/TalentHub publishing.
- Removed the behavioral tendency to replace unsupported prompts with default arcade categories.
- Added explicit guidance for preserving requested game families such as 连连看, rhythm, restaurant management, sports, board, card, physics, strategy, and narrative games.
- Added a prompt-routing test case that rejects old fallback behavior.

## 0.1.0

- Initial TalentHub-ready HTML Game Maker agent package.
