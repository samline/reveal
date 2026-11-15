---
title: 'Accessibility and motion'
titleAccent: 'motion'
description: What @samline/reveal guarantees for reduced motion, printing, screen readers and keyboard users, and what your page still provides.
locale: en
sidebar:
  group: guides
  order: 4
  label: Accessibility
---

## Responsibilities

Reveal only decides when an element animates in; the stylesheet does the animation. It guarantees that content is never hidden when it should be readable: elements already in view on load are never hidden, and every element is visible without JavaScript, without IntersectionObserver, with reduced motion and when printing. It does not change roles, labels or the tab order.

## Motion and state

- With `prefers-reduced-motion: reduce` nothing is hidden or animated, and scrub mode shows the element as is.
- Hidden elements use opacity and the individual `translate`, `scale` and `filter` properties, never `display` or `visibility`, so the page layout does not jump when they appear.
- `data-reveal-repeat` hides an element again when it leaves the viewport. Use it for decoration, not for text people need to read twice.

## Screen readers and keyboard

An element waiting below the fold is transparent but still in the accessibility tree, so screen readers read it and links inside it stay in the tab order. When keyboard focus moves into one, the browser scrolls it into view and it is revealed. Do not combine reveal with `aria-hidden` or `inert` on content that matters.

## Layout and contrast

Keep effects subtle: short distances, `fade` or `up`, and durations around the default 600 ms. `blur` and large `zoom` values are harder on visitors sensitive to motion. Contrast is checked on the final state; while revealing, text is briefly lighter.
