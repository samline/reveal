# Changelog

All notable changes to this package. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [semver](https://semver.org/).

## Unreleased

### Changed

- The package moved from the `samline/utils` monorepo to its own repository, [samline/reveal](https://github.com/samline/reveal). Homepage, repository and documentation links point to the package's own site.

## [1.0.0] - 2026-11-13

### Added

- First release: `reveal` and `autoReveal` reveal elements as they scroll into view with seven CSS effects (`up`, `down`, `left`, `right`, `fade`, `zoom`, `blur`), cascades per `data-reveal-stagger` container, `repeat`, per-element duration, delay and distance, and a CSS-only scrub mode on `animation-timeline: view()`. Content in view on load is never hidden; without JavaScript, with reduced motion or when printing, everything stays visible. ESM, CommonJS, `style.css` and a browser global (`window.Reveal`) that starts on its own.
