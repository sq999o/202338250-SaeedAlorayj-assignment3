# Saeed Alorayj | Portfolio

A personal portfolio for SWE 363 Assignment 3 at KFUPM. It builds on Assignment 2's featured projects, search, theme switch and contact demo by adding a live GitHub repository browser.

## Run locally

From the project directory, run:

```sh
python -m http.server 8000
```

Open http://localhost:8000. No build step, dependencies or API key are required. The GitHub section needs an internet connection.

## Try it

- Search for “Campus” under Projects to find the dashboard.
- Under GitHub repositories, choose a language and sort by name. Refresh to restore both selections.
- Expand “Time on this page” in the footer to see the elapsed time since navigation.
- Switch the theme, refresh, and check that it stays selected.
- Submit an empty contact form to focus the first invalid field. Valid input produces a local confirmation.

## Files

The page is in `index.html`, with styles in `css/styles.css`. The original interactions are in `js/script.js`, and GitHub loading and display are in `js/repositories.js`. Project illustrations are stored in `assets/images/`.

[Technical documentation](docs/technical-documentation.md) · [AI usage report](docs/ai-usage-report.md)
