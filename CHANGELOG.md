# Changelog

All notable changes to this package. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [semver](https://semver.org/).

## [1.0.2] - 2026-11-17

### Fixed

- `repeat` with `stagger`: an element revealed on its own after leaving the viewport no longer keeps the cascade delay it got in an earlier batch.

## [1.0.1] - 2026-11-17

### Changed

- The scroll-driven scrub animation in `style.css` is named `reveal-scrub` instead of `samline-reveal-scrub`, like the `--reveal-*` custom properties. Only CSS that referenced the old keyframes name by hand needs the new one.
- The package moved from the `samline/utils` monorepo to its own repository, [samline/reveal](https://github.com/samline/reveal). Homepage, repository and documentation links point to the package's own site.

## [1.0.0] - 2026-11-13

### Added

- First release: `reveal` and `autoReveal` reveal elements as they scroll into view with seven CSS effects (`up`, `down`, `left`, `right`, `fade`, `zoom`, `blur`), cascades per `data-reveal-stagger` container, `repeat`, per-element duration, delay and distance, and a CSS-only scrub mode on `animation-timeline: view()`. Content in view on load is never hidden; without JavaScript, with reduced motion or when printing, everything stays visible. ESM, CommonJS, `style.css` and a browser global (`window.Reveal`) that starts on its own.
