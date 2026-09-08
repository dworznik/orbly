# Orbly — landing site

Marketing site for **Orbly**: any message becomes a circular glyph — a key
only a scan can open. Print it on a tee, a wall, a tote, a card.

A single static page, no build step. Open `index.html` or serve the folder.

```
index.html      one scrolling page: hero · how it works · gallery · footer
404.html        not-found page (served by both GitHub Pages and Cloudflare)
_headers        Cloudflare Pages caching + security headers
config.js       deployment config: the Loops newsletter form id
assets/         glyph images (g1–g6, ps, pm)
```

The hero glyph is rendered live on a `<canvas>` (192-dimensional signed
tendril encoding of *"Creativity is contagious, pass it on"*). Everything
else is plain HTML/CSS — IBM Plex Sans, ink-blue ground, orange accent.

## Deploy

The repo is served from two places. Both publish the repo root as-is, so there
is nothing to build.

The one value that is not the same everywhere is `config.js`, which carries the
Loops newsletter form id for the early-access form. It is committed, so whatever
is on a branch is what that branch's deployment posts to. `main` **is**
production, so `main` must always carry the production form id — merging the
`REPLACE_ME` placeholder ships a form that silently fails for every visitor, and
merging a test id sends real signups to the wrong Loops audience.

### GitHub Pages — production

`Lenskiy/orbly`, branch `main`, path `/` (legacy branch build, not Actions).
The custom domain `orbly.to` comes from the `CNAME` file; `.nojekyll` stops
Jekyll from touching the folder. Both files are GitHub-only — Cloudflare just
serves them as plain files and ignores them.

### Cloudflare Pages — `*.pages.dev` + branch previews

Connect `dworznik/orbly` in the Cloudflare dashboard: **Workers & Pages →
Create → Pages → Connect to Git**, then:

| Setting                | Value    |
| ---------------------- | -------- |
| Framework preset       | None     |
| Build command          | `exit 0` |
| Build output directory | `/`      |
| Root directory         | `/`      |

`exit 0` is Cloudflare's documented no-op for a site with no build step. That
is the whole setup — `main` deploys to `<project>.pages.dev` and every other
branch gets its own preview URL. `_headers` (caching + security headers) is
picked up automatically; it is a Cloudflare-only file.

There is no `wrangler.toml` on purpose: it is the source of truth only for
Pages Functions and bindings, which this site does not use.

### Moving `orbly.to` to Cloudflare later

`orbly.to` currently resolves via Namecheap DNS to the GitHub Pages IPs. To
hand the domain to Cloudflare instead: move the domain's nameservers to
Cloudflare, add the custom domain in the Pages project, and delete the `CNAME`
file so GitHub Pages stays independently reachable at `lenskiy.github.io/orbly`
— every asset path in `index.html` is relative, so the subpath works unchanged.
