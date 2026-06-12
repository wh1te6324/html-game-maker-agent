# STUDIO_WORKFLOW.md - Prompt-To-Game Pipeline

This workflow adapts Claude Code Game Studios for a lightweight HTML game agent. It replaces hard-coded genre routing with semantic production roles and quality gates.

## One-Shot Default Studio Flow

Claude Code Game Studios uses many explicit skills and gates for long-running projects. For this agent, those steps are defaulted into one compact pass so a single sentence can produce a playable browser game. Do not ask the user to run separate commands unless the prompt is impossible or unsafe to interpret.

Run these defaults internally for every generation:

1. **Auto-Start**: Treat the user's prompt as the concept seed. Infer platform as browser, engine as vanilla HTML/CSS/JavaScript, review mode as lean, scope as one polished mini game, and delivery as a three-file zip.
2. **Creative Brief**: Extract target feeling, core fantasy, prompt nouns, player verbs, closest game family, and what would betray the prompt.
3. **Concept Options**: Consider three directions: obvious, surprising, and focused. Choose the focused direction unless another direction is clearly stronger.
4. **Pillars And Anti-Pillars**: Define three pillars with decision tests and two anti-pillars. Use them to reject generic loops and visual placeholders.
5. **Systems Map**: Convert the selected concept into entities, states, input, rules, resources, pressure, progression, feedback, edge cases, and tuning constants.
6. **Art Bible**: Create a visual identity anchor, palette roles, shape language, material style, HUD style, effects language, and style prohibitions.
7. **Asset Inventory**: List every visible asset the mini game needs: player objects, NPCs/enemies, goals, hazards, props, background layers, UI icons, particles, overlays, and state effects. If browsing/retrieval/image tools exist, gather reference or generate source material, then convert it into self-contained Canvas/SVG/CSS/data-URI assets.
8. **Prototype Plan**: Identify the riskiest assumption and the smallest playable loop that proves it. Build that loop directly rather than producing a separate prototype artifact.
9. **Implementation Sprint**: Write the three files with readable constants, state, input, update, render, UI, restart, and progression sections.
10. **Smoke Gate**: Before returning, mentally test launch, first input, objective visibility, win/loss or completion, restart, mobile layout, visual density, and exact zip contract.

These stages are internal scaffolding. The user should experience them as a direct one-shot generator, not as a multi-command project management system.

## Default Virtual Gates

Simulate these review voices before finalizing:

- **Creative Director Gate**: Does the result preserve the fantasy and pillars? Is it meaningfully different from a generic template?
- **Art Director Gate**: Is the first screen visually specific, layered, and rich enough? Are assets coherent and prompt-native?
- **Technical Director Gate**: Is the implementation small, self-contained, responsive, and maintainable in three files?
- **Producer Gate**: Is the scope finished instead of ambitious but incomplete?
- **QA Gate**: Can a player understand, interact, fail/succeed, and restart without instructions outside the game?

If any gate fails, revise the files before packaging. Do not report internal gate drama to the user unless a blocker remains.

## Phase 1: Concept Extraction

Read the prompt and identify:

- Player fantasy
- Target feeling
- Prompt-specific nouns
- Player verbs
- Required entities
- Theme and art cues
- Constraints
- Requested controls or platform
- Win/loss or success/failure expectation

Do not decide the genre from a fixed list. Describe the requested experience in verb-first language.

## Phase 2: Design Pillars

Create three compact design anchors:

- **Pillar 1**: the action the player performs most often.
- **Pillar 2**: the decision or tension that makes the action interesting.
- **Pillar 3**: the visual or emotional identity that makes the game feel specific.

Create two anti-pillars:

- What this game must not collapse into.
- Which generic loop or visual trope would betray the prompt.

Run a short contrast pass:

- Candidate A: the most obvious implementation.
- Candidate B: a more prompt-specific implementation.
- Decision: choose the one with stronger mechanics, clearer feedback, and richer visual identity. If Candidate A is a generic avoid/collect loop, reject it unless the prompt explicitly asked for that.

## Phase 3: Systems Map

Map systems as:

```text
input -> state change -> feedback -> progression or failure pressure
```

Required system fields:

- Entities
- State variables
- Player actions
- Rules
- Resources, timers, scores, health, or progress
- Edge cases
- Tuning constants
- Feedback states

## Phase 4: Runtime Blueprint

Choose a runtime blueprint only after the systems map. The blueprint is an implementation scaffold:

- Queue/station blueprint
- Timing/window blueprint
- Placement/build blueprint
- Dialogue/map blueprint
- Board/hand/grid blueprint
- Lane/field blueprint
- Physics/toy blueprint
- Spatial action blueprint
- Quiz/mastery blueprint
- Open experimental blueprint

Blueprint labels are not user-facing genres and must not override the prompt.

## Phase 5: Art Bible

Before coding, define:

- Palette with contrast roles
- Background motif
- Entity silhouettes
- UI surface style
- Feedback effects
- Animation rhythm
- Prompt-specific prop list
- Asset plan: generated sprites/icons, decorative props, particles, state effects, and background/foreground depth layers

The art bible must be visible in the final game through actual CSS/Canvas/DOM choices.

If the runtime environment provides browsing, retrieval, or image-generation tools, use them before coding to gather visual reference or create source material. Treat online material as inspiration or permissive input only. The final game should not depend on remote URLs, CDNs, tracking pixels, or network calls; convert the useful ideas into self-contained Canvas/SVG/CSS/data-URI assets.

## Phase 6: Implementation

Build only the scope that can be complete:

- Opening state
- Play state
- Feedback state
- Completion or failure state
- Restart
- Keyboard and touch or pointer support
- Responsive layout

Use readable vanilla JavaScript and keep constants at the top.

## Phase 7: QA Gate

Before packaging, check:

- The first input changes state immediately.
- The requested game family is recognizable.
- The main entities are prompt-specific.
- The screen has visual depth: background, playable entities, UI, feedback effects, and prompt-specific props are all present.
- The game is not visually thin: no blank arena with only text plus simple circles/rectangles unless the prompt demands abstraction.
- HUD communicates objective and pressure.
- There is a visible success/failure or completion loop.
- Restart works.
- Mobile layout does not overlap.
- Zip contains exactly `index.html`, `styles.css`, and `script.js`.
