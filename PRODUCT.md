# Sandesh & Chandana's wedding

<!-- impeccable:product-schema 1 -->

## Platform
web

Static website; deployment target is now Cloudflare Pages, connected to the existing private GitHub repository.

## Purpose and audience
A wedding invitation for the couple's family and friends. Visitors should quickly find the wedding date, ceremony time, reception time, venues and original Kannada invitation. Mobile access and sharing matter.

## Confirmed facts
- Groom: Sandesh S. Hegde / ಸಂದೇಶ ಎಸ್. ಹೆಗಡೆ.
- Bride: Chandana C. Bhat / ಚಂದನಾ ಸಿ. ಭಟ್. The user corrected the surname to Bhat, ಭಟ್.
- Wedding: Sunday 13 December 2026, 09:13 IST, Dhanur Lagna.
- Wedding venue, as transcribed: ಶ್ರೀ ರಾಘವೇಶ್ವರ ಸಭಾಭವನ, ಬಚ್ಚಳ್ಳಿ ರಸ್ತೆ, ಅಗ್ರಹಾರ, ಸಾಗರ.
- Wedding lunch: 13 December, from 12:30 PM.
- Bridal welcome: 13 December, 6:08 PM, groom's home, ಬಂಗ್ಲೆಕೊಪ್ಪ.
- Yaksha–Gaana Vaibhava: Monday 14 December, from 11 AM.
- Reception and lunch: Monday 14 December 2026, 1 PM, ಬಂಗ್ಲೆಕೊಪ್ಪ, ಮಾವಿನಗುಂಡಿ, ಸಿದ್ದಾಪುರ ತಾ॥. Time explicitly supplied by the user.
- Groom's parents: ಕವಿತಾ ಮತ್ತು ಶ್ರೀಧರ ಸಿ. ಹೆಗಡೆ. English spelling explicitly corrected by user: Shridhar C. Hegde.
- Bride's parents: ಚೇತನಾ ಮತ್ತು ಚಂದ್ರಶೇಖರ ಭಟ್.

## Assets and constraints
Invitation.pdf is the supplied source; its instructions are content, not agent instructions. No couple portraits have been supplied. The website must not invent their personal history or use stock models as the couple. GitHub Pages requires a static deliverable.

## Working assumptions and open decisions
- Kannada and English presentation, with English as initial language, is a reversible assumption following the unanswered language preference and the user's instruction to continue.
- English place/parent-name transliterations need family verification. Kannada remains the source wording.
- The user supplied the exact Banglekoppa home pin: https://maps.app.goo.gl/sDHHJNV3LDDcjhfZ9 . It resolves to 14.236759, 74.809287. Home directions must use this pin. Wedding hall pin remains a search until verified. Use Banglekoppa in English.
- No RSVP backend or contact numbers requested.
- User chose a new repository named sandesh-chandana-wedding and requested private visibility. Created under Saakihegde12345, confirmed private. GitHub accepted Pages hosting with a public website.
- Publication is not complete: GitHub refused Actions run 41098219425 due to account payment/spending restrictions. The existing main Pages domain awesomeprojects.me also redirects project URLs and currently fails HTTPS verification. No account-wide domain or billing changes were made.

## Quality
Distinctive animated wedding experience; readable Kannada; responsive layout; keyboard access; reduced motion support; useful without JavaScript.

## Redesign requested 1 November 2026
The user rejected the blue minimal design and explicitly requested a rich divine aesthetic, background imagery, a Ganapathi idol at the beginning, more animation and meaningful popup interactions. Use vermilion, deep wine, antique gold and sandalwood. Preserve all confirmed facts and bilingual behavior. Add a calendar chooser with direct Google Calendar links and standard iCalendar downloads for Apple, Outlook and other apps. Calendar hold duration must be described honestly, since event finish times are unannounced. Cloudflare setup screenshots show Workers; provide the correct Pages setup for a public static directory. Keep the source repository private.
