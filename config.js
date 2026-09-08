/* Deployment configuration.
 *
 * This site has no build step and is served from the repo root by two
 * deployments — GitHub Pages (orbly.to) and Cloudflare Pages (*.pages.dev).
 * Cloudflare env vars need a build, and .nojekyll rules out Liquid templating,
 * so a plain static file is the only mechanism both hosts honour.
 *
 * A Loops newsletter form id is public by design: it ships in the page source
 * of every site using a Loops form. This separates the test audience from the
 * production one — it is not a secret store, so never put a Loops API key here.
 */
window.ORBLY_CONFIG = {
  loopsFormId: "REPLACE_ME"
};
