# Sandesh & Chandana

A bilingual English/Kannada wedding invitation, designed from the family's printed invitation. Static HTML, CSS and JavaScript; no build step and no production dependencies.

The repository is private. Publication is currently blocked by the account's GitHub Actions billing/spending-limit restriction. See DEPLOYMENT.md for verified status and retry instructions.

## Preview

Serve the public directory with any static server. For example:

    npx --yes serve public

## GitHub Pages

Push this project to the main branch of a GitHub repository. In Settings → Pages → Build and deployment, select GitHub Actions. The included workflow publishes only the public folder.

## Updating the invitation

- English text lives directly in public/index.html; Kannada lives in each element's data-kn attribute.
- Event dates and times use Indian Standard Time. The countdown target is in public/app.js.
- Update the calendar file if an event changes.
- Reception: 14 December 2026 at 1 PM, as confirmed by the family.
- Bride's surname: Bhat / ಭಟ್.
- Map links currently search for the venue/area. Replace them with verified map pins before sharing with guests.
- The original invitation PDF is included in the public website. It contains family details from the printed invitation.
- English spellings of parents' and places' names are transliterations; confirm them with the family.

## Accessibility and animation

Reduced motion, animation control, keyboard navigation and a remembered language selection are supported. Essential event information and the PDF work without JavaScript.

## Artwork and fonts

Botanical artwork was generated for this website with the built-in image generation tool. Its full prompt is in ASSETS.md. Fonts are self-hosted Google Fonts (Cormorant Garamond, Manrope, Noto Serif Kannada) under the SIL Open Font License, with license copies in public/assets/fonts.
