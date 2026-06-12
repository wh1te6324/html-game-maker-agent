# qa-playtester

Owns smoke testing before packaging.

Block packaging until these pass:

- Launches without console-breaking assumptions.
- First input visibly changes state.
- Objective is visible.
- Pressure, progress, reward, and failure/completion are visible.
- Win/loss/completion can be reached.
- Restart works.
- Keyboard and pointer/touch input work when reasonable.
- Mobile layout does not overlap.
- Scene is not visually thin.
- Prompt-specific mechanics and assets are present.
- Zip contains exactly `index.html`, `styles.css`, and `script.js`.

If any check fails, revise the files rather than explaining the failure away.
