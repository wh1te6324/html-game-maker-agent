# SUBAGENT_ARCHITECTURE.md - One-Shot Studio Relay

This agent uses a compact sub-agent architecture inspired by Claude Code Game Studios, adapted for one-sentence HTML game generation. These are virtual roles, not separate required user commands. A model-backed generator should simulate them internally before writing `index.html`, `styles.css`, and `script.js`.

## Orchestration Rule

For every prompt, run a single internal studio relay:

```text
Prompt
 -> Producer scope lock
 -> Creative Director vision lock
 -> Game Designer loop lock
 -> Systems Designer state/rules lock
 -> Art Department visual production pass
 -> Gameplay Programmer implementation
 -> QA Playtester smoke gate
 -> Three-file zip
```

The relay must stay fast enough for one-shot generation. Do not ask the user to choose agents, approve intermediate docs, or run slash commands unless the prompt cannot be interpreted safely.

## Core Departments

### Production

- **Producer** keeps scope finishable: one polished mini game, no roadmap-only ideas, no half-built systems.
- **QA Playtester** blocks packaging if launch, input, objective, feedback, win/loss/completion, restart, mobile layout, or zip contract fails.

### Design

- **Creative Director** protects fantasy, tone, pillars, anti-pillars, and prompt specificity.
- **Game Designer** owns the 10-second loop, verbs, pressure, reward, failure/completion, and restart rule.
- **Systems Designer** owns entities, state, resources, rules, edge cases, and tuning constants.
- **UX Designer** owns first-screen readability, HUD hierarchy, onboarding, input affordances, and accessibility.

### Art-Forward Department

Art is intentionally overrepresented because weak visuals are the most common failure mode for one-shot HTML games.

- **Art Director** owns the visual identity anchor, palette, material language, shape grammar, and style prohibitions.
- **Visual Development Artist** owns composition, mood, scene depth, lighting, camera framing, and the first-screen read.
- **Asset Designer** owns the asset inventory: characters, props, hazards, goals, background layers, icons, panels, pickups, and decorative details.
- **VFX Artist** owns particles, trails, pulses, transitions, hit/collect/win/loss feedback, and state-specific visual effects.
- **UI/HUD Artist** owns HUD materials, buttons, meters, typography feel, icons, status panels, and restart affordance.
- **Technical Artist** owns self-contained implementation of visuals using Canvas, SVG, CSS, procedural drawing, and data URIs while preserving performance.

### Engineering

- **Gameplay Programmer** implements the smallest complete playable loop and keeps code readable.

## Art Department Default Pass

Before implementation, the Art Department must produce these internal decisions:

1. **Visual Identity Anchor**: one sentence that could resolve a style disagreement.
2. **Palette Roles**: background, surface, primary action, reward, danger, disabled, glow, and text colors.
3. **Shape Grammar**: player, threat, reward, UI, and environment silhouettes.
4. **Scene Layers**: far background, midground world, playfield, foreground accents, HUD, and overlay effects.
5. **Asset Inventory**: visible objects needed for the prompt, including at least six prompt-specific visual assets for non-abstract prompts.
6. **VFX Matrix**: effect for input, success, miss/damage, progress, win, loss, and restart.
7. **UI Material System**: panel style, meter style, button style, icon style, and typography tone.
8. **Style Prohibitions**: what would make the scene look generic, empty, or off-prompt.

If any item is missing, revise before writing final files.

## One-Shot Gate Order

Use these gates internally:

1. **Vision Gate**: The chosen loop must serve the prompt fantasy.
2. **Art Gate**: The first screen must look like the requested game before the player reads text.
3. **Asset Gate**: The scene must include layered, prompt-specific assets rather than bare geometry.
4. **Implementation Gate**: The game must run without remote dependencies.
5. **Smoke Gate**: The game must be playable, restartable, and understandable.

## Agent File Map

Detailed virtual role cards live in:

```text
.claude/agents/producer.md
.claude/agents/creative-director.md
.claude/agents/game-designer.md
.claude/agents/systems-designer.md
.claude/agents/ux-designer.md
.claude/agents/art-director.md
.claude/agents/visual-development-artist.md
.claude/agents/asset-designer.md
.claude/agents/vfx-artist.md
.claude/agents/ui-hud-artist.md
.claude/agents/technical-artist.md
.claude/agents/gameplay-programmer.md
.claude/agents/qa-playtester.md
```

These files are instruction cards for the generator. They are intentionally shorter than full Claude Code Game Studios agents so they fit inside a one-shot generation prompt.
