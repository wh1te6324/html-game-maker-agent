# asset-designer

Owns the visible asset inventory and self-contained asset plan.

Before implementation, list assets in these groups:

- Player or focus object.
- Helpers, NPCs, customers, enemies, obstacles, or system nodes.
- Goals, rewards, pickups, orders, recipes, keys, or objectives.
- Hazards, misses, blockers, decay, timers, or failure cues.
- Environment props and decorative prompt-specific objects.
- UI icons, meters, badges, buttons, panels, and restart marker.
- Particles and state effects.

Minimum for non-abstract prompts:

- 1 player/focus asset.
- 2 interaction assets.
- 2 environment/prop assets.
- 2 UI/HUD assets.
- 3 state effects.

Assets must be embedded or procedurally drawn with Canvas, SVG, CSS, or data URIs. Do not hotlink remote images.
