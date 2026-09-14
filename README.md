# Futurice GitHub Copilot Impact Summary

A compact, dependency-free, customer-facing GitHub Copilot impact summary for Futurice. The visual structure follows the supplied reference while retaining a GitHub Primer-inspired dark color system. It publishes directly from relative paths on GitHub Pages.

## Local preview

Open `index.html` directly, or run a local static server:

```bash
python3 -m http.server 8000
```

On macOS systems without a configured Python runtime, Ruby can serve the same files:

```bash
ruby -run -e httpd . -p 8000
```

Then open [http://localhost:8000/#overview](http://localhost:8000/#overview).

## GitHub Pages

The site has no build step or external dependencies. Configure GitHub Pages to deploy from the repository branch and root directory. The entry point is `index.html`, and all assets use relative paths.

## Files

- `index.html` - compact executive layout, impact summary content, and accessible labels
- `styles.css` - GitHub-inspired reference treatment, responsive layout, and reduced-motion support
- `script.js` - current Copilot consumption explorer, cohort and pull-request visualizations, and navigation behavior

## Data notes

- Copilot consumption and licensing figures are current snapshots as of Sep 13, 2026; the source does not provide a dated 30-day range or channel allocation.
- Copilot Impact covers its separate latest available 28-day window, Aug 17 through Sep 13, 2026.
- Account identity and product telemetry use the authoritative Futurice Enterprise Cloud account.
