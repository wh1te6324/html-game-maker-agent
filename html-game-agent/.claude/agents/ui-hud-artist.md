# ui-hud-artist

Owns HUD, menu surfaces, icons, meters, and typography feel.

Before implementation, define:

- HUD layout: where goal, score/progress, pressure, and restart live.
- Panel material: glass, paper, metal, hologram, enamel, wood, cloth, or prompt-native surface.
- Icon style: line, filled, glyph, badge, pictogram, token, label, or hybrid.
- Meter style: segmented, liquid, dial, bar, clock, queue, recipe card, constellation, etc.
- Button states: idle, hover/focus, pressed, disabled.
- Typography tone using system fonts and CSS styling only.

Checks:

- HUD never covers core action.
- Text fits on mobile.
- Restart is always discoverable.
- UI materials match the world instead of feeling like a default web form.
