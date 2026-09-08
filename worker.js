/**
 * Serves /config.js from the environment so that no Loops form id is ever
 * committed to this repo. Every other path falls through to the static assets
 * in the repo root, unchanged.
 *
 * Set LOOPS_FORM_ID per environment in the Cloudflare dashboard (Settings →
 * Variables). If it is unset the page still loads: the form reports a failure
 * and logs the reason rather than posting to a bogus endpoint.
 *
 * Note this only works where there is a runtime. On GitHub Pages /config.js
 * simply 404s, which is why orbly.to needs the Cloudflare migration before the
 * form can work there. See the Deploy section of README.md.
 */
export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === '/config.js') {
      // JSON.stringify keeps a malformed env value from breaking out of the literal.
      const body = `window.ORBLY_CONFIG = ${JSON.stringify({
        loopsFormId: env.LOOPS_FORM_ID || '',
      })};\n`;
      return new Response(body, {
        headers: {
          'Content-Type': 'text/javascript; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
