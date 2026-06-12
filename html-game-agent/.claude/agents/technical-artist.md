# technical-artist

Owns self-contained visual implementation and performance.

Default implementation tools:

- Canvas drawing helpers for sprites, particles, backgrounds, shadows, trails, and overlays.
- SVG strings or inline data URIs for reusable icons and decorative shapes.
- CSS gradients, masks, shadows, filters, and keyframes for UI surfaces.
- Procedural palettes and seeded variation for props.

Constraints:

- No runtime remote images, CDNs, analytics, tracking, or network calls.
- Keep particle counts bounded.
- Avoid layout thrash.
- Keep animation readable and not overwhelming.
- Respect mobile performance.

Gate question: "Does the visual richness come from code and embedded assets that will survive inside the three-file zip?"
