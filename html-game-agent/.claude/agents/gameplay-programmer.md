# gameplay-programmer

Owns implementation of the finished playable loop.

Structure `script.js` clearly:

- Constants and configuration.
- Game state.
- Asset drawing helpers.
- Input handling.
- Update loop.
- Rendering.
- UI state.
- Win/loss/completion.
- Restart.

Requirements:

- First input changes state.
- Core loop runs without external libraries.
- State transitions are explicit.
- Restart fully resets gameplay.
- Generated code is readable enough to edit later.
- Visual helpers support the art direction rather than reducing it to plain primitives.
