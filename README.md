# Sandesh & Chandana

A bilingual English/Kannada wedding invitation, designed from the family's printed invitation. Static HTML, CSS and JavaScript; no build step and no production dependencies.

The repository is private. The current hosting target is Cloudflare Pages, which builds directly from this repository and does not require the failed GitHub Actions deployment. See DEPLOYMENT.md for exact Pages settings.

## Preview

Serve the public directory with any static server. For example:

    npx --yes serve public

## Cloudflare Pages

Create a Pages project (not a Workers application), connect this repository, and choose: production branch main; framework None; build command exit 0; output directory public; repository root unchanged. Preview builds may stay enabled. Keep Access protection off for a public guest invitation.

The previous GitHub Pages workflow is retained as an optional manual fallback and no longer runs on each push.

## Updating the invitation

- English text lives directly in public/index.html; Kannada lives in each element's data-kn attribute.
- Event dates and times use Indian Standard Time. The countdown target is in public/app.js.
- Event calendar data is in public/calendar.js. Run node scripts/generate-calendars.cjs after editing it. Google links and calendar files share these event definitions.
- Reception: 14 December 2026 at 1 PM, as confirmed by the family.
- Bride's surname: Bhat / ಭಟ್.
- Home directions use the family-supplied exact pin, 14.236759, 74.809287. The wedding hall remains a venue search until its exact pin is confirmed.
- The original invitation PDF is included in the public website. It contains family details from the printed invitation.
- English spellings of parents' and places' names are transliterations; confirm them with the family.

## Accessibility and animation

Reduced motion, animation control, keyboard navigation and a remembered language selection are supported. Essential event information and the PDF work without JavaScript.

## Artwork and fonts

The divine mandap and Ganapathi artwork were generated for this website with the built-in image generation tool. Prompts and sources are recorded in ASSETS.md and asset sidecars. Fonts are self-hosted Google Fonts (Cormorant Garamond, Manrope, Noto Serif Kannada) under the SIL Open Font License, with license copies in public/assets/fonts.

## Checks

Run node scripts/calendar.test.cjs to verify calendar links and iCalendar output. The browser check in scripts/check.cjs requires Playwright (available in the Codex bundled runtime) and a Chromium-compatible browser; BROWSER_PATH can override its default Brave executable. It checks five viewport widths, both languages, dialog controls, zoom, exact home coordinates, reduced motion, countdown edge cases and static fallbacks.
