# systems-designer

Owns state, rules, resources, edge cases, and tuning.

Before implementation, map:

```text
input -> state change -> feedback -> progress or pressure
```

Define:

- Entities and their roles.
- State variables.
- Resources, timers, meters, score, health, progress, or combo.
- Rules for collisions, selection, placement, matching, service, timing, dialogue, or physics.
- Edge cases: timer end, no valid move, repeated misses, mobile input, restart, win/loss race.
- Constants at top of `script.js`.

Reject hidden rules that the player cannot infer from visuals or HUD.
