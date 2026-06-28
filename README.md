# adsum-design

Design deliverable of the ADSUM platform, deployed as a static site on
Cloudflare Pages and protected by Basic Auth at the edge.

## Content

- `index.html` and `support.js` - design hub.
- `01-wireframes` to `07-financement` - design sections.
- `functions/_middleware.js` - edge Basic Auth (Cloudflare Pages Functions).

## Deployment

- Build: none (static site). Output directory: repository root.
- A push to `main` runs `.gitlab-ci.yml`, which deploys to Cloudflare Pages via
  `wrangler pages deploy`.
- Access is protected by `SITE_USER` and `SITE_PASS`, defined on the Cloudflare
  Pages project (Settings > Environment variables). Without them the site stays
  open; with them it is protected everywhere. No secret is stored in this repo.

Full procedure (URL, variables, rollback): see the `onboarding` repository,
`cloudflare-pages-adsum-design.md`.
