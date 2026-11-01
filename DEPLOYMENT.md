# Cloudflare Pages deployment

Updated 1 November 2026 (Asia/Kolkata). The source repository remains private: Saakihegde12345/sandesh-chandana-wedding.

## The supplied screenshots

The screenshots show a **Workers** application: the form asks for a deploy command and suggests npx wrangler deploy / preview. This repository is a static Pages site. Use the Pages setup instead of deploying that Workers form.

Cloudflare dashboard → Workers & Pages → Create application → Pages → Import an existing Git repository / Connect to Git → select sandesh-chandana-wedding.

## Exact settings

| Setting | Value |
|---|---|
| Project name | sandesh-chandana-wedding-invitation (or another available name) |
| Production branch | main |
| Framework preset | None |
| Build command | exit 0 |
| Build output directory | public |
| Root directory | Leave unchanged / repository root |
| Environment variables | None needed |
| Preview builds | Enabled is fine |
| Cloudflare Access | Off for a public guest invitation |

Pages does not need a Wrangler deploy/preview command in this setup.

After Save and Deploy, use the actual pages.dev URL Cloudflare returns. The GitHub repository can remain private; Cloudflare Pages supports private repositories. Git integration publishes new pushes directly through Cloudflare.

Official setup: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
Private GitHub source: https://developers.cloudflare.com/pages/get-started/git-integration/

## Current verification boundary

The site has passed local browser checks at 320, 390, 768, 1024 and 1440px in English and Kannada. Four dialogs were checked at 320px, including scroll reset, close visibility after scrolling, focus restoration, gallery paging/zoom, and exact home coordinates. Calendar links and RFC iCalendar files were validated; actual Apple/Outlook native import screens are not available in this environment.

No Cloudflare deployment URL or connected Cloudflare API session has been supplied. Do not claim the revised site is publicly live until the returned URL is fetched and checked.

## Home and venue

The family-supplied Banglekoppa pin is https://maps.app.goo.gl/sDHHJNV3LDDcjhfZ9, coordinates 14.236759, 74.809287. Website home directions and reception calendar use it. The wedding hall link remains a venue search until its exact entrance pin is supplied.

## Prior GitHub Pages attempt

GitHub Actions run 41098219425 was refused due an account payment/spending-limit restriction. The main Pages site's awesomeprojects.me domain also redirected project sites and failed HTTPS verification. These issues do not need to be changed to use the new Cloudflare pages.dev site. No billing or main-domain settings were changed.

The optional GitHub Pages workflow is now manual only; it will not run on every new push.
