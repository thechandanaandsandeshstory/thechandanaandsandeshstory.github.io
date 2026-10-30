---
name: "Sandesh & Chandana — Silver at blue hour"
description: "A cobalt and silver Kannada wedding invitation with a quiet, legible information layer."
colors:
  midnight: "#11264c"
  blue: "#244683"
  ink: "#203655"
  pearl: "#f5f5f0"
  silver: "#dce4ef"
  muted: "#58677b"
  pale: "#e9eef5"
  rule: "#c9d2dd"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(76px, 7vw, 96px)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(38px, 4.25vw, 60px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "29px"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.6
  kannada-body:
    fontFamily: "Noto Serif Kannada, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.95
  kannada-display:
    fontFamily: "Noto Serif Kannada, serif"
    fontSize: "clamp(48px, 5vw, 68px)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  kannada-headline:
    fontFamily: "Noto Serif Kannada, serif"
    fontSize: "clamp(29px, 3vw, 41px)"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0em"
rounded:
  button: "2px"
spacing:
  xs: "8px"
  sm: "12px"
  control-gap: "16px"
  md: "20px"
  gutter: "24px"
  lg: "30px"
  xl: "40px"
components:
  button-light:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.midnight}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "15px 24px"
    height: "54px"
  button-light-hover:
    backgroundColor: "#fff"
  button-blue:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.pearl}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "15px 24px"
    height: "54px"
  button-blue-hover:
    backgroundColor: "{colors.midnight}"
  button-light-outline:
    backgroundColor: "transparent"
    textColor: "{colors.silver}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "15px 24px"
    height: "54px"
  button-light-outline-hover:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.midnight}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "15px 24px"
    height: "54px"
  button-outline-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.pearl}"
  navigation:
    textColor: "{colors.silver}"
  language-switch:
    textColor: "{colors.silver}"
  event-row:
    textColor: "{colors.ink}"
    padding: "30px 0"
  invitation-date:
    textColor: "{colors.blue}"
    padding: "52px 24px 36px"
  countdown:
    textColor: "{colors.ink}"
---

# Design System: Silver at blue hour

## Overview

**Creative North Star: "Silver at blue hour"**

An illuminated Kannada invitation unfolds into a blue-hour courtyard. Cobalt ink, silver foliage, fine architectural arches and generous pearl paper connect the experience to the supplied family invitation. Locally hosted serif typography makes the couple's names feel like the invitation itself; the supporting information is calm and precise.

The botanical artwork is a generated silver engraving, not a depiction of a real wedding venue. No couple portraits were supplied. The code-led implementation is the visual authority; this document finalizes the provisional direction from the actual `public/index.html`, `public/style.css` and `public/app.js`, including the final responsive cascade. There is no approved external composition to match.

**Key Characteristics:**
- Cobalt and silver atmosphere grounded in the original Kannada invitation.
- Architectural arches and fine rules rather than a card-based interface.
- Expressive English display type with a dedicated, comfortably spaced Kannada voice.
- One coordinated entrance, followed by still and accessible event information.
- Pearl reading surfaces alternating with deep blue invitation and venue spreads.

## Colors

The palette moves between blue-hour darkness and cool paper. The frontmatter owns exact color values; these names follow the source CSS custom properties.

### Primary
- **Cobalt Ink (`blue`)** carries actions, event times, date numerals and selected decorative lines.
- **Blue-hour Midnight (`midnight`)** anchors the cover and venue spread and deepens blue button hover states.

### Neutral
- **Pearl Paper (`pearl`)** is the default page surface and light text on cobalt buttons.
- **Invitation Silver (`silver`)** is the principal text, fine ornament and filled action color against midnight.
- **Reading Ink (`ink`)** carries default body text on light surfaces.
- **Quiet Ink (`muted`)** carries supporting family, schedule and invitation copy.
- **Pale Blue Paper (`pale`)** distinguishes the countdown and closing surfaces.
- **Paper Rule (`rule`)** divides events, family details and sections without adding visual weight.

**The Light-on-Blue Rule.** Use silver text and ornament on midnight; use ink and muted ink on pearl or pale paper. Preserve the observed contrast pairings when extending components.

Translucent derivatives of midnight, silver, cobalt and the rule color supply shading and hairlines. They are contextual treatments, not additional accent families.

## Typography

**Display Font:** Cormorant Garamond, with Georgia and serif fallbacks. **Body Font:** Manrope, with Arial and sans-serif fallbacks. **Kannada Font:** Noto Serif Kannada, with a serif fallback. All three are served locally through `public/assets/fonts.css` with font swapping.

The frontmatter captures default display, headline, event-title, body and button-label roles. English names use regular display type; headings use medium display type. The italic ampersand and closing signature are restrained calligraphic accents. Numeric dates and countdown values use tabular numerals.

Desktop explanatory paragraphs use the body size with a longer reading line height (1.95) and maximum width (65ch). Family details, event descriptions and venue addresses settle at (14px); navigation, dates, links and utility labels settle at (12px). At phone widths, explanatory paragraphs are (14px), event and venue copy (13px), and supporting utility text (11–12px). These are final cascade values, not the smaller declarations earlier in the stylesheet.

**The Two-Script Rule.** Kannada is a complete typographic mode. Use Noto Serif Kannada, remove display tracking, and preserve its longer line heights. Do not squeeze Kannada into the English name metrics.

Kannada body text inherits its dedicated frontmatter role; headings use the Kannada headline role. Kannada event titles are (22px, line height 1.8), venue titles (28px, line height 1.8) and family names (16px, line height 1.9) before mobile overrides. The ampersand retains the display family in Kannada mode. Responsive display values are recorded under Layout.

## Layout

The shared reading container is capped at (1180px) and otherwise occupies (88%) of the viewport. The absolute cover header uses (5%) side padding and a (96px) height. The cover uses (100svh), bounded by a minimum height (850px) and maximum (1080px), with centered names and botanical artwork filling the background.

Desktop content uses open editorial grids: welcome (.85fr / 1.6fr with a 9% gap), event days (.85fr / 2fr with a 7% gap), venues (equal columns with a 10% gap), and the original invitation (.95fr / 1fr with a 12% gap). Welcome spacing is (132px top / 126px bottom), celebration (120px / 108px), venues (100px / 70px) and original invitation (130px each side). These are section-specific measurements, not a normalized spacing scale.

- At (1000px) and below, grid gaps tighten and date numerals and venue titles reduce; main sections remain in columns.
- At (700px) and below, the reading container becomes viewport width minus (48px), leaving (24px) margins. Welcome, event days, venues and original invitation become single-column compositions. The header is (82px) high. Only the celebration navigation link remains visible; language selection stays available. Buttons retain minimum height (54px) with padding (14px 20px). Main content sections use roughly (75–80px) vertical spacing; the closing begins at (95px).
- The phone cover is bounded by (780–980px), with a flatter arch and artwork sized to its height. English names use `clamp(64px, 16vw, 90px)`; Kannada names use `clamp(42px, 12vw, 56px)`. The date wraps into two lines. Kannada headings use (29px), event titles (20px) and venue titles (26px).
- At (370px) and below, shared content margins become (18px), header side padding becomes (16px), and English names become (62px). Later mobile legibility rules still govern navigation, labels and event copy.
- At (1600px) and above, cover artwork stretches to the full cover dimensions.

Print removes cover artwork, header controls, buttons, countdown, invitation thumbnail and map note. It uses compact (25px) section spacing and avoids page breaks inside an event day. Event details remain readable without decorative backgrounds.

## Elevation & Depth

Most surfaces are flat. Tone, botanical engraving, fine rules and nested arch outlines create depth. The scanned paper preview is the deliberate exception: its foreground sheet uses a paper shadow (`8px 20px 40px #20365526`), rests at a small rotation and lifts on hover or keyboard focus. The backing sheet has no shadow.

**The Paper Depth Rule.** Reserve the existing cast shadow and physical lift for the original invitation preview. Event rows and venue articles stay open and rule-separated.

The entrance is coordinated rather than continuous: artwork reveals over (2s), arch and names over (1.8s), and date/action details use the same duration with small delays. Activating Open the invitation scrolls to welcome and triggers a short (1.2s) date-arch unfold. There is no scroll-linked animation. The sidecar carries easing and component transitions.

The visible motion control remembers the guest's preference. Reduced-motion settings remove spatial animation and transitions and turn off smooth scrolling. Content and links do not wait for an animation to become usable.

## Shapes

Controls are almost square, with the button radius defined in frontmatter. Single-pixel borders recur in buttons, event divisions, venue articles and nested arches. The cover arch uses an elliptical crown (`50% 50% 0 0 / 36% 36% 0 0`), becoming flatter on phones (`50% 50% 0 0 / 24% 24% 0 0`). Date and closing arches use related silhouettes adapted to their proportions.

Icons are inline, unfilled line drawings: the shared box is (21px) with stroke width (1.4), rounded caps and joins. Contextual icons reduce to (16–18px). Keep this light stroke character alongside rules and ornament.

## Components

### Buttons and text links

Four button variants share typography, geometry and alignment. Silver-filled actions open the cover; cobalt-filled actions save calendar dates and open the invitation; silver-outline actions open map searches; cobalt-outline actions share the invitation. Frontmatter `height` represents the CSS minimum, allowing translated text to grow. Kannada buttons switch family and use extra top padding (18px).

Button color and border transitions take (.25s). Silver fills turn white on hover; cobalt fills deepen to midnight; outlines fill in their matching color. All interactive elements use a visible current-color outline (2px with a 6px offset). Text links use an underlined label, optional arrow and minimum height (44px); the underline strengthens on hover.

### Navigation and language selection

The cover header pairs a Cormorant monogram, section links and two-language selector. Links reveal a fine underline on hover. Language buttons expose selection through `aria-pressed`, full opacity and an underline; unselected labels remain at (.65) opacity. They are at least (44px) high; phone width is (40px). Selection changes the document language, translations and relevant accessible labels, and is remembered when storage is available. English is the initial document language.

### Date arch and countdown

The date arch is a thin outlined, centered composition with a large regular serif numeral. Desktop maximum width is (300px) and minimum height (350px), reducing to (190px wide / 238px minimum height) on phones. The countdown is an open horizontal set of serif numerals (48px desktop / 39px phone), utility labels and colons, not boxed cards. It clamps to zero at the fixed IST wedding instant and changes its heading when the celebration begins.

### Event rows and venue articles

Each event has a fixed time column (94px), flexible content column and gap (25px), with rules between events. On phones these become (73px / flexible) with a (13px) gap and (25px) vertical padding. Venue articles use a top rule and align map actions after the address. Preserve bilingual text, explicit IST time labels and the distinction between venue and area searches; `PRODUCT.md` owns all names, dates and corrected event facts.

### Original invitation and sharing

The original three-page PDF is represented by its actual scanned cover, layered over a backing sheet. Preview and read actions open the document; a separate action downloads it. Hover and keyboard focus share the same preview lift. Sharing uses the native share sheet when available, then clipboard copying, then a visible instruction. A polite live status reports the result; cancelling native sharing does not produce a false success message.

Without JavaScript, English content, event information, anchor navigation, map searches and PDF/calendar links remain available. Language, motion, sharing and the live countdown appear only with JavaScript.

## Do's and Don'ts

### Do:
- **Do** preserve the cobalt, silver, midnight and pearl relationships of the invitation.
- **Do** treat Kannada as a complete typographic mode with its own family, spacing and responsive sizes.
- **Do** keep schedules and venues in open, rule-separated layouts with tabular event times.
- **Do** retain keyboard-visible focus, reduced-motion support and useful static invitation content.
- **Do** use the supplied invitation scan for the original-document preview and keep product facts in `PRODUCT.md`.

### Don't:
- **Don't** use stock models or fabricated portraits to represent the couple.
- **Don't** present generated botanical artwork as a photograph of the wedding venue.
- **Don't** replace the invitation's cobalt and silver identity with a new accent palette.
- **Don't** turn event rows into elevated cards or apply the paper-preview shadow throughout the page.
- **Don't** make decorative reveals block access to the invitation or event details.
