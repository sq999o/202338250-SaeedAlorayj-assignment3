# Technical documentation

## Data flow

On page load, the browser requests up to 100 recently updated public repositories from `https://api.github.com/users/sq999o/repos?sort=updated&per_page=100`. It shows a loading message while the language and sort controls are disabled. A successful response supplies the repository name, language, last update and optional description. A missing language appears as “Unspecified.” Names link to the corresponding repository on GitHub. Repository text is inserted with DOM text properties.

The page builds language choices from the response, restores available preferences, filters by language, then orders matching entries by update date or name. A name comparison breaks date ties. The count updates with the list. An empty response shows an empty-state message. A failed request, including a rate limit or a 12-second timeout, shows a retry button. Featured projects and the contact form remain usable independently.

## State

The fetched list lives in memory. Changing language or sort order reuses it without another request. The browser stores language and sort in the localStorage key `portfolio-repository-view` and the theme in `portfolio-theme`. A saved language that disappears from the API falls back to all languages. Blocking storage still allows changes during the current visit. Contact fields are validated locally and are never sent or stored.

## Performance

The page uses deferred scripts and two small local SVG images with explicit dimensions and native lazy loading. It renders repository entries together using one list replacement. No runtime library is required.

## Verification

- Chromium at a 390 px viewport passed controlled checks for retry after HTTP 503, missing language, an empty account, combined filtering and sorting, restored preferences, theme persistence, featured-project search, form validation and the visit timer. No horizontal overflow was detected at that width.
- A separate request to the live GitHub endpoint returned five repositories. The local browser could not reach GitHub directly, so the successful rendering and retry checks used controlled API responses.
- Local mobile Lighthouse performance score: 100/100. The external API was unavailable to the audit browser. This score describes the local page in that condition and may change on a public host.
