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

When collaborating with other agents:

- Ask design-focused agents for concise pillar, loop, system, or balance guidance.
- Ask art-focused agents for a compact visual identity and asset language.
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
