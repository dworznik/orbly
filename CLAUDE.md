# orbly

Static site (`index.html` + `assets/`), no build step. Published from the repo
root by two deployments: GitHub Pages (`Lenskiy/orbly` `main` → production,
`orbly.to`) and Cloudflare Workers Builds (`dworznik/orbly`, configured by
`wrangler.jsonc`, per-branch version previews). See the Deploy section of
`README.md`.

## Migrating off GitHub Pages — read this first

**`orbly.to` is moving from GitHub Pages to Cloudflare, imminently.** Treat
Cloudflare as the target platform for anything you build; do not add work that
only makes sense on GitHub Pages, and do not "fix" Cloudflare-only files by
giving them a GitHub Pages equivalent.

This is not cosmetic. Cloudflare has a runtime and GitHub Pages does not, and
the early-access form already depends on that difference:

- **No secret, key or id is ever committed to this repo.** The Loops form id is
  served at `/config.js` by `worker.js`, read from the `LOOPS_FORM_ID`
  environment variable set in the Cloudflare dashboard. If you need another such
  value, add it the same way — never as a committed file.
- **On GitHub Pages there is no runtime**, so `/config.js` 404s and the
  early-access form cannot work on `orbly.to` until the migration completes.
  That is expected and documented, not a regression to patch around.
- `_headers` is honoured by Cloudflare and ignored by GitHub Pages.

## Agent skills

### Issue tracker

Issues live as GitHub issues in `Lenskiy/orbly`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Git conventions

### Branch names

Branch off `main` with a type prefix matching the change:

```
feat/qr-hover-state
fix/gallery-alt-text
docs/agent-skills-setup
chore/bump-analytics-beacon
refactor/extract-hero-styles
```

Use `<type>/<short-kebab-case-description>`. The types are the same set as the commit types below.

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<optional scope>): <description>`.

```
feat(gallery): add lightbox for colourway images
fix(hero): correct alt text on swapped g3/g4 images
docs: record issue tracker and triage label config
chore(analytics): cache-bust the GoatCounter beacon
```

Rules:

- **Type** is one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Description** is imperative mood, lower case, no trailing full stop ("add lightbox", not "Added lightbox.").
- **Scope** is optional and names the affected area (`gallery`, `hero`, `footer`, `analytics`).
- A **breaking change** is marked with `!` after the type/scope (`feat(api)!: drop legacy query param`) and explained in a `BREAKING CHANGE:` footer.
- Keep the subject line under ~72 characters; put detail in the body.

PR titles follow the same format, since PRs are squash-merged into `main`.
