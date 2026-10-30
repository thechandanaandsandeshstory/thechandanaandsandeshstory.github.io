# Deployment status

30 October 2026 (Asia/Kolkata).

## Completed
- Built and browser-tested the complete static wedding website in public/.
- Independent visual review: ship against the code-led direction.
- Created Saakihegde12345/sandesh-chandana-wedding as a **private** repository.
- Pushed the source to main.
- Enabled public GitHub Pages with GitHub Actions; GitHub accepted the configuration for this private repository.

## Publication blocked
Run 41098219425 was refused before any job steps started. GitHub's annotation:

> The job was not started because recent account payments have failed or your spending limit needs to be increased. Please check the 'Billing & plans' section in your settings

Resolve the account billing/spending-limit issue in https://github.com/settings/billing and retry the existing deployment:

    gh run rerun 41098219425 --repo Saakihegde12345/sandesh-chandana-wedding

The website is not live yet. The repository remains private.

## Existing account-wide domain
The account's main Pages site, Saakihegde12345.github.io, has the custom domain awesomeprojects.me. GitHub automatically redirects the wedding project URL to http://awesomeprojects.me/sandesh-chandana-wedding/.

At verification, awesomeprojects.me resolved to 75.2.60.5 / 99.83.190.102, while GitHub Pages resolved to 185.199.108–111.153. HTTP redirected to HTTPS and the HTTPS connection failed. The existing custom domain configuration was left unchanged, because changing the main site's domain can affect other projects.

Before sharing with guests, resolve the domain routing and HTTPS, or explicitly authorize changing the main Pages site's custom-domain configuration. Do not claim a public wedding URL works until it has been fetched and browser-checked.

## Family verification before sharing
- Replace venue/area searches with confirmed map pins.
- Confirm English transliterations of parents' names and venue/address wording.
- The original downloadable PDF includes the family information printed on the invitation.
