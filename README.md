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
- `script.js` - evidence-aware Copilot product-surface explorer, cohort and pull-request visualizations, and navigation behavior

## Data notes

- Copilot consumption and licensing figures are current snapshots as of Sep 13, 2026; the source does not provide a dated 30-day range or channel allocation.
- Copilot Impact covers its separate latest available 28-day window, Aug 17 through Sep 13, 2026.
- Account identity and product telemetry use the authoritative Futurice Enterprise Cloud account.
- Cohorts are adoption-maturity classifications, not product surfaces or channel-attribution data.
- The product-surface explorer distinguishes observed telemetry from product capability. Only aggregate Copilot AI units and Coding Agent AI units are observed; IDE, CLI, code review, Agentic Workflows, Spaces, and customization usage are unavailable in the source snapshot.
- Third-party agents are omitted because the source snapshot does not identify any third-party agent usage.

Product capability descriptions follow GitHub's documentation for [IDE code suggestions](https://docs.github.com/en/copilot/concepts/completions/code-suggestions), [Copilot Chat](https://docs.github.com/en/copilot/concepts/chat), [Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli), [Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review), [Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent), [Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces), [custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions), and [GitHub Agentic Workflows](https://github.com/github/gh-aw).
