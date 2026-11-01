# Performance optimization — 1 November 2026

The continuous full-screen canvas was the primary idle rendering cost. It has been replaced by twelve tiny CSS motes animated with transforms and opacity. They pause offscreen, in hidden tabs and in dialogs. There is no recurring JavaScript animation loop while the page is idle.

Additional changes:
- Removed animated blur/brightness filters and full-viewport modal backdrop blur.
- Switched self-hosted fonts from full TTF files to Unicode-ranged WOFF2 files, preserving all three font families and Kannada coverage.
- Removed startup innerText reads that forced expensive text layout.
- Load invitation viewer scans only when opened. Destroy the Google Maps iframe when its dialog closes.
- Cap petal showers at 18 on phones / 32 on desktop and insert them in one batch.
- Update only countdown digits that changed; update scroll classes only at their thresholds.

## Controlled before/after workload

Same Chromium browser, 4× CPU throttling, 1.5 device pixel ratio, cold browser context. Each run loads the invitation, measures two idle seconds, scrolls, opens the calendar and plays a blessing shower. Timing samples vary; these are local diagnostics, not real-device field scores or an FPS guarantee.

| Measurement | Before | Optimized |
|---|---:|---:|
| Phone total browser task time | 8,979 ms | 3,216 ms |
| Desktop total browser task time | 8,857 ms | 3,380 ms |
| Phone idle task time, 2-second sample | 1,277 ms | 46 ms |
| Desktop idle task time, 2-second sample | 1,247 ms | 151 ms |
| Full-screen canvas redraws, idle sample | 319–327 | 0 |
| Font data requested | 1,333,836 bytes | 243,612 bytes |
| Phone resource data requested | 2,233,160 bytes | 1,101,601 bytes |
| Desktop resource data requested | 1,944,692 bytes | 813,133 bytes |

Total browser work dropped about 62–64%; font data dropped 82%. First-contentful-paint timings varied and are not claimed as an improvement.

The workload and trace capture live in scripts/profile.cjs. Browser regression checks additionally cover both languages, five widths, all dialogs, map teardown, deferred invitation loading, motion controls, and calendar output.
