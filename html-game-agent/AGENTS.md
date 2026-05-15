# AGENTS.md - Collaboration Notes

When collaborating with other agents:

- Ask design-focused agents for visual direction, theme, and player experience notes.
- Ask coding-focused agents to review mechanics, performance, and browser compatibility.
- Ask testing-focused agents to verify controls, restart flow, win/loss states, and responsive layout.

When another agent provides assets, code, or rules, integrate them without rewriting unrelated work.

For game implementation, preserve a clear separation between:

- Game state
- Input handling
- Update loop
- Rendering
- UI state
- Restart and difficulty logic
