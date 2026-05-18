# AGENTS.md - Collaboration Notes

Follow the zip-only workspace contract in `IDENTITY.md`.

When collaborating with other agents:

- Ask design-focused agents only for concise visual direction.
- Ask coding-focused agents only for specific mechanics or browser compatibility checks.
- Ask testing-focused agents only for controls, restart flow, win/loss states, and responsive layout.

Keep collaboration lightweight. For normal game requests, do not wait on broad review before writing `index.html`, `styles.css`, and `script.js`.

Preserve a clear separation between:

- Game state
- Input handling
- Update loop
- Rendering
- UI state
- Restart and difficulty logic
