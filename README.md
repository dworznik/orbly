# Orbly — landing site

Marketing site for **Orbly**: any message becomes a circular glyph — a key
only a scan can open. Print it on a tee, a wall, a tote, a card.

A single static page, no build step. Open `index.html` or serve the folder.

```
index.html      one scrolling page: hero · how it works · gallery · footer
404.html        not-found page (served by both GitHub Pages and Cloudflare)
_headers        Cloudflare caching + security headers
worker.js       serves /config.js from the environment (no ids in the repo)
wrangler.jsonc  Cloudflare Workers build config (serves the root as assets)
assets/         glyph images (g1–g6, ps, pm)
```

The hero glyph is rendered live on a `<canvas>` (192-dimensional signed
tendril encoding of *"Creativity is contagious, pass it on"*). Everything
else is plain HTML/CSS — IBM Plex Sans, ink-blue ground, orange accent.

## Deploy

The repo is served from two places. Both publish the repo root as-is, so there
is nothing to build.

**No id is ever committed.** The early-access form reads its Loops form id from
`window.ORBLY_CONFIG`, which is served at `/config.js` by `worker.js` from the
`LOOPS_FORM_ID` environment variable. Set it per environment in the Cloudflare
dashboard (Settings → Variables). There is deliberately no static `config.js`:
Workers prefers a matching static asset over the Worker, so committing one would
shadow the dynamic value and reintroduce a hardcoded id.

This needs a runtime, so it works on Cloudflare and **not** on GitHub Pages,
where `/config.js` 404s and the form reports a failure instead of submitting.
That is the current state of `orbly.to` and it is resolved by the migration
below, not by adding a file.

### GitHub Pages — production

`Lenskiy/orbly`, branch `main`, path `/` (legacy branch build, not Actions).
The custom domain `orbly.to` comes from the `CNAME` file; `.nojekyll` stops
Jekyll from touching the folder. Both files are GitHub-only — Cloudflare just
serves them as plain files and ignores them.

### Cloudflare Pages — `*.pages.dev` + branch previews

`dworznik/orbly` is connected as a **Workers Builds** project (not Pages).
Workers Builds runs a deploy command rather than a build command:

| Branch          | Deploy command                 | Result                       |
| --------------- | ------------------------------ | ---------------------------- |
| production      | `npx wrangler deploy`          | live on the Worker's URL     |
| any other branch| `npx wrangler versions upload` | a per-version preview URL    |

Both read `wrangler.jsonc`, which declares the repo root as the asset
directory — there is no build, so the assets are simply the checked-out files.
`_headers` (caching + security headers) and `404.html` are honoured by Workers
static assets, the latter via `not_found_handling`.

The `name` in `wrangler.jsonc` must match the Worker configured in the
Cloudflare dashboard. If the build log says the Worker cannot be found, that
field is what to fix.

### Moving `orbly.to` to Cloudflare later

`orbly.to` currently resolves via Namecheap DNS to the GitHub Pages IPs. To
hand the domain to Cloudflare instead: move the domain's nameservers to
Cloudflare, add the custom domain in the Pages project, and delete the `CNAME`
file so GitHub Pages stays independently reachable at `lenskiy.github.io/orbly`
— every asset path in `index.html` is relative, so the subpath works unchanged.
