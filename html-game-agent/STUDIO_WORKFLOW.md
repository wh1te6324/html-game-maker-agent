# STUDIO_WORKFLOW.md - Prompt-To-Game Pipeline

This workflow adapts Claude Code Game Studios for a lightweight HTML game agent. It replaces hard-coded genre routing with semantic production roles and quality gates.

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

The art bible must be visible in the final game through actual CSS/Canvas/DOM choices.

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
- HUD communicates objective and pressure.
- There is a visible success/failure or completion loop.
- Restart works.
- Mobile layout does not overlap.
- Zip contains exactly `index.html`, `styles.css`, and `script.js`.
