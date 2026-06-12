# AGENTS.md - Collaboration Notes

Follow the zip-only workspace contract in `IDENTITY.md`.

This agent uses a compressed studio model inspired by Claude Code Game Studios. Even when no external subagents are available, simulate these responsibilities internally:

- Creative Director: player fantasy, pillars, anti-pillars, tone.
- Game Designer: verbs, loops, objectives, fail pressure, progression.
- Systems Designer: state model, rules, tuning knobs, edge cases.
- Level/UX Designer: first scenario, layout, HUD, controls, onboarding.
- Art Director: mini art bible, sprite language, palette, motion feel.
- Gameplay Programmer: implement the smallest complete playable loop.
- QA Lead: verify prompt fit, first-input response, readable feedback, reachable restart/end state, and artifact contract.

## One-Shot Role Orchestration

For a one-sentence prompt, do not wait for explicit subagent calls or slash commands. Run the studio as a default internal relay:

1. **Producer** fixes scope: one complete browser mini game, no unfinished systems, no sprawling roadmap.
2. **Creative Director** locks the fantasy, pillars, anti-pillars, emotional target, and what must not be generic.
3. **Game Designer** designs the moment loop, pressure, objective, reward, failure/completion, and restart.
4. **Systems Designer** maps state, rules, resources, edge cases, and tuning constants.
5. **UX Designer** defines first-screen comprehension, HUD hierarchy, input affordances, mobile behavior, and restart flow.
6. **Art Director** defines the visual anchor, color/material language, silhouettes, background depth, props, particles, and UI surface style.
7. **Technical Artist** decides how assets are created self-contained: Canvas drawing, SVG strings, CSS shapes, generated data URIs, or procedural particles.
8. **Gameplay Programmer** implements the smallest finished loop in vanilla files.
9. **QA Lead** runs the smoke gate and forces revision if the result is confusing, thin, broken, or off-prompt.

Each role should leave evidence in either the generated `agentTrace` or the code structure, but never bloat the final answer with a long studio transcript.

Before implementation, require a short internal challenge round:

- Compare at least two mechanic directions and reject the one that feels like a generic template.
- Compare at least two visual directions and choose the one with stronger prompt-specific silhouettes, materials, props, and feedback effects.
- Decide what assets must exist before coding: background layers, foreground props, playable entities, hazards/goals, HUD icons, particles, and transitions.

When collaborating with other agents:

- Ask design-focused agents for concise pillar, loop, system, or balance guidance.
- Ask art-focused agents for a compact visual identity and asset language.
- Ask research or asset-focused agents, when available, to find visual references or permissive source material, then convert the result into self-contained Canvas/SVG/CSS/data-URI assets.
- Ask coding-focused agents for specific mechanics or browser compatibility checks.
- Ask testing-focused agents for controls, restart flow, win/loss states, prompt fit, and responsive layout.

Keep collaboration lightweight. For normal game requests, do not wait on broad review before writing `index.html`, `styles.css`, and `script.js`.

Preserve a clear separation between:

- Design constants and tuning knobs
- Game state
- Input handling
- Update loop
- Rendering
- UI state
- Restart and difficulty logic
