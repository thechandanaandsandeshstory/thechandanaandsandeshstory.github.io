---
name: "Sandesh & Chandana — Divine celebration"
description: "A Ganapathi-first wedding invitation in wine, vermilion, antique gold and sandalwood paper."
colors:
  wine: "#300e17"
  wine-deep: "#210a10"
  vermilion: "#9c302c"
  gold: "#dfb96e"
  gold-light: "#f4d99e"
  paper: "#faf1df"
  sand: "#edddbf"
  ink: "#492b24"
  muted: "#745c4b"
  rule: "#b18a4e55"
typography:
  display: {fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(76px, 7vw, 96px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.035em"}
  headline: {fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(38px, 4.25vw, 60px)", fontWeight: 500, lineHeight: 1.12, letterSpacing: "-0.025em"}
  event-title: {fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "30px", fontWeight: 500, lineHeight: 1.2}
  body: {fontFamily: "Manrope, Arial, sans-serif", fontSize: "16px", fontWeight: 400, lineHeight: 1.8}
  label: {fontFamily: "Manrope, Arial, sans-serif", fontSize: "13px", fontWeight: 500, lineHeight: 1.6}
  kannada-body: {fontFamily: "Noto Serif Kannada, serif", fontSize: "16px", fontWeight: 400, lineHeight: 1.95}
  kannada-display: {fontFamily: "Noto Serif Kannada, serif", fontSize: "clamp(48px, 5vw, 68px)", fontWeight: 400, lineHeight: 1.6, letterSpacing: "0em"}
rounded:
  button: "4px"
  choice: "6px"
  dialog: "12px"
  floating-pin: "28px"
spacing:
  control-gap: "16px"
  gutter: "24px"
  dialog-inset: "42px"
components:
  button-gold: {backgroundColor: "{colors.gold-light}", textColor: "{colors.wine}", typography: "{typography.label}", rounded: "{rounded.button}", padding: "15px 24px", height: "54px"}
  button-gold-hover: {backgroundColor: "#ffe7b5"}
  button-primary: {backgroundColor: "{colors.wine}", textColor: "{colors.paper}", typography: "{typography.label}", rounded: "{rounded.button}", padding: "15px 24px", height: "54px"}
  button-primary-hover: {backgroundColor: "#682425"}
  button-outline: {backgroundColor: "transparent", textColor: "{colors.wine}", typography: "{typography.label}", rounded: "{rounded.button}", padding: "15px 24px", height: "54px"}
  button-outline-hover: {backgroundColor: "{colors.sand}", textColor: "{colors.wine}"}
  button-gold-outline: {backgroundColor: "transparent", textColor: "{colors.gold-light}", typography: "{typography.label}", rounded: "{rounded.button}", padding: "15px 24px", height: "54px"}
  button-gold-outline-hover: {backgroundColor: "{colors.gold-light}", textColor: "{colors.wine}"}
  dialog: {backgroundColor: "{colors.paper}", textColor: "{colors.ink}", rounded: "{rounded.dialog}", width: "calc(100% - 32px)"}
  calendar-choice-selected: {backgroundColor: "{colors.wine}", textColor: "{colors.paper}", rounded: "{rounded.choice}", padding: "12px", height: "80px"}
---

# Design System: Divine celebration

## Overview

**Creative North Star: "A lamp-lit mandap"**

A richly decorated mandap opens the wedding celebration with Lord Ganapathi, a Kannada invocation and the couple's names. Deep wine, vermilion, antique gold, flower garlands and sandalwood paper create the divine atmosphere explicitly requested on 1 November 2026. This replaces the earlier blue minimal direction.

Scene-setting raster artwork carries the ornament; clear typography carries the information. Ganapathi remains the first focal point. On 2 November 2026 the family requested an old royal scroll in place of the date plaque and richer divine treatment for the schedule. The scroll, silk banner and two ceremonial day panels extend the existing world. The final code-led implementation, with `style.css` followed by `divine.css`, is the visual authority; no approved external comp exists. `DESIGN-BRIEF.md` holds the surface contract and `PRODUCT.md` holds corrected names and event facts.

**Key Characteristics:**
- Ganapathi first, framed by a full-bleed illuminated mandap.
- Deep wine and antique gold contrasted with warm reading paper.
- Independently composed portrait artwork for phones.
- Bilingual type with generous Kannada line spacing.
- Purposeful dialogs, user-controlled sound and motion, and readable static defaults.

## Colors

### Primary

Wine and deep wine anchor the cover, dark sections and primary actions. Vermilion marks dates, event times and Kannada accents. Antique gold supplies borders and ornament; light gold supplies luminous text and cover actions.

### Neutral

Paper is the reading and dialog surface; sand distinguishes closing and supporting surfaces. Ink carries body text, muted ink carries supporting copy, and translucent brass rules divide information. The frontmatter owns actual semantic values. Legacy layout-variable names resolve to this palette; they do not authorize reviving the retired blue identity.

**The Lamp-and-Paper Rule.** Pair light gold or paper with wine; pair ink or muted ink with paper. Let artwork and brass details enrich dark surfaces while keeping event copy clear.

## Typography

Cormorant Garamond supplies English names, headings and large date numerals; Manrope supplies reading and controls; Noto Serif Kannada supplies Kannada. All three remain self-hosted with Unicode-ranged WOFF2 files and font swapping. The frontmatter records default roles from the final cascade. Paragraphs reach (65ch), with explanatory copy using line height (1.95); event copy is (13px) with line height (1.85).

**The Two-Script Rule.** Kannada uses its own family, zero display tracking and longer line heights. Preserve its language-specific metrics rather than shrinking it into English measurements.

Kannada headings use `clamp(29px, 3vw, 41px)` with line height (1.7). Dialog headings are (42px English / 29px Kannada) on desktop and (35px / 25px) on phones. English event titles use (30px), with wedding and reception titles at (34px); phones use (28px / 31px). Kannada titles use (22px desktop / 20px phone), reducing to (19px) below 370px. Buttons use the label role, reduce to (12px) on phones and switch to Kannada type with extra top padding (18px).

## Layout

The shared container is `min(1180px, 88%)`. The desktop welcome pairs the royal scroll with the family invitation. The schedule pairs two day panels under a silk-and-lamp banner; each panel keeps times and event details in an open list. Welcome and schedule stack at 900px. Venue and original-invitation sections retain open two-column editorial grids. Main sections retain roughly (100–132px) vertical spacing. The fixed header is (88px) high and gains a deep-wine surface after scrolling.

The cover is (100svh), bounded by (920–1150px), with centered content up to (960px). A (154px) Ganapathi image precedes the invocation and horizontal English name lockup. `divine-mandap.webp` and `ganapathi.webp` are actual raster assets; the scene is generated art, not a photograph of the event venue.

- At (1000px) and below, grid gaps tighten and English cover names become (80px); Kannada names become (52px).
- At (700px) and below, content stacks with (24px) margins, the header becomes (76px), and portrait `divine-mandap-mobile.webp` replaces the landscape scene. The cover is bounded by (940–1150px); Ganapathi is (142px), and names stack vertically. English names use `clamp(60px, 16vw, 80px)`; Kannada names use `clamp(42px, 12vw, 56px)`. Only the celebration navigation link remains visible; language selection stays accessible.
- At (370px) and below, shared margins become (18px), header margins (16px), and English cover names (59px).

Dialogs fit within the viewport: ordinary maximum width (620px), viewer maximum (1080px), with mobile edge clearance. Non-viewer content scrolls inside a separate padded wrapper; close controls stay outside it. Print removes atmospheric effects and controls and uses plain reading surfaces.

## Elevation & Depth

Layered mandap imagery, a subtle halo and gold motes give the cover depth. The date scroll's rolled parchment and brass finials carry their own photographed depth, with actual alpha transparency around its silhouette. The invitation preview retains its paper lift; the fixed header and home shortcut receive restrained shadows. Dialogs use a larger shadow against a dark dimmed backdrop. Full-screen backdrop blur is avoided for smooth rendering.

**The Controlled Atmosphere Rule.** Twelve small CSS motes replace a continuous full-screen canvas. They pause offscreen, in hidden tabs and while dialogs are open; motion controls and reduced-motion preferences are respected. Entrance motion uses opacity and transforms, with no animated blur or brightness filters. Petal showers are capped at 18 on phones and 32 on larger screens. Sound starts only after an explicit sound-control action.

The entrance coordinates artwork (2.3s), Ganapathi (1.4s), names (1.8s) and date/action (1.7s). Dialogs arrive over (.35s). Entry and blessing actions can trigger finite petal showers (3.3s fall); reduced motion suppresses them. The temple chime is synthesized and opt-in, with an immediate stop control; it never autoplays.

## Shapes

The dominant forms are the ornate mandap, old royal parchment and warm rectangular reading surfaces. Frontmatter defines control, choice, dialog and home-shortcut radii. The date scroll is (360px) wide on desktop, (310px) on phones and (284px) below 370px, always at a 2:3 aspect ratio. Date text remains live HTML, with a vermilion-wine Kannada ribbon, a large date and readable month/year/day/location. Fine brass frames identify the two day panels; individual events remain unboxed. Icons remain inline, unfilled SVG line drawings, including the viewer's navigation arrows.

## Components

### Royal scroll and ceremonial schedule

`royal-scroll.webp` provides blank aged parchment with curled rolls, brass finials, floral engraving and a silk tassel. `ceremonial-silk.webp` provides the banner's jasmine/marigold toran, brass lamps and brocade, and is reused in the two day headings. Both are decorative images with empty alt text, explicit dimensions, async decoding and lazy loading. Their combined compressed size is about (336 KiB). They introduce no continuous animation or JavaScript work. All dates, names, translations and event details remain editable HTML.

The 2 November visual pass checked English and Kannada at 320, 390, 768 and 1440px; the existing functional suite also covered 1024px and all dialogs. The mechanical detector's cream-palette advisory is intentional parchment from the supplied reference. Its new scroll-padding warning reads the retired base border; the rendered scroll has no CSS border and places text inside a 21% horizontal inset. Gold text sits on wine surfaces, not the paper background inferred by the static detector. The viewer image intentionally has no source until its dialog opens, preserving the existing deferred-loading behavior.

### Actions and navigation

Four button variants serve gold entry, wine primary actions, wine outlines on paper, and gold outlines on dark surfaces. The frontmatter height is a minimum, allowing translated labels to grow. Desktop padding reduces to (14px 20px) on phones. Hover changes color or fill; the gold action gains a soft glow. Keyboard focus uses a current-color outline (2px, offset 6px). Language selection uses `aria-pressed` and an underline, with both labels fully opaque. The floating home shortcut appears after the cover threshold and hides while a dialog is open.

### Dialog foundation

All four production surfaces use native `dialog` and modal focus handling. Opening resets dialog and inner scroll positions and focuses the close control. Close buttons remain outside scroll wrappers; closing by button, Escape or backdrop restores focus to the trigger. Background scrolling is locked. Do not move the close control into scrolling content.

### Calendar and invitation viewer

The calendar chooser has pressed-state wedding/reception options, a direct Google Calendar link and standard iCalendar files for Apple, Outlook and other apps. Its note explicitly describes an adjustable one-hour hold because event finish times are unannounced. The invitation viewer shows the actual three scanned pages, previous/next SVG controls, page status, keyboard arrows, zoom and a PDF fallback; page one and scroll position reset on opening, and zoom resets on closing.

### Blessing and exact home map

The blessing dialog pairs Ganapathi, the Kannada prayer and a user-triggered petal shower with a polite acknowledgement; it does not claim to save or send blessings. The travel dialog lazy-loads the supplied exact home pin (14.236759, 74.809287), offers driving directions and copies the original map link with a readable fallback. The wedding hall remains a venue search until verified.

Without JavaScript, English details, anchor navigation, original PDF, calendar download and map links remain useful. JavaScript-dependent controls appear only when enabled; native sharing falls back to copying or a visible instruction. English is initially shown; the guest's language and motion preferences can be remembered.

## Do's and Don'ts

### Do:

- **Do** place Ganapathi before the names and preserve the divine mandap atmosphere.
- **Do** use wine, vermilion, gold and warm paper through the semantic tokens.
- **Do** retain independent mobile artwork and Kannada typography.
- **Do** keep dialog close controls reachable and preserve focus, scrolling and reduced-motion behavior.
- **Do** preserve Shridhar, Bhat / ಭಟ್, the supplied home pin and honestly labeled calendar holds from product truth.

### Don't:

- **Don't** restore the retired blue minimal identity or use layout aliases as new palette names.
- **Don't** represent generated scene art as a real venue or fabricate couple portraits.
- **Don't** autoplay sound, run atmosphere behind dialogs or force motion under reduced motion.
- **Don't** imply that local petal animations submit, store or deliver blessings.
