# orbly

Static site (`index.html`, `config.js` + `assets/`), no build step. Published from the repo
root by two deployments: GitHub Pages (`Lenskiy/orbly` `main` → production,
`orbly.to`) and Cloudflare Pages (`dworznik/orbly` → `*.pages.dev` plus branch
previews). See the Deploy section of `README.md`.

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
