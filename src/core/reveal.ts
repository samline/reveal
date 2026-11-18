// DOM-free part of reveal: types, constants and pure helpers. The DOM
// controller lives in src/vanilla/reveal.ts.
import { type AutoInitController, type ElementTarget } from '@samline/internal'

export type { AutoInitController, ElementTarget }

/** Effects shipped in `style.css`. An empty `data-reveal` means `'up'`. */
export const REVEAL_EFFECTS = ['up', 'down', 'left', 'right', 'fade', 'zoom', 'blur'] as const

export type RevealEffect = (typeof REVEAL_EFFECTS)[number]

/** `pending` (hidden), `revealing` (transition running) or `revealed`. */
export type RevealState = 'pending' | 'revealing' | 'revealed'

export interface RevealOptions {
  /** Effect for elements whose `data-reveal` is empty or missing. Defaults to `'up'`. */
  effect?: RevealEffect
  /** Transition length in milliseconds. Defaults to the CSS value (600). */
  duration?: number
  /** Delay before the transition in milliseconds. Defaults to the CSS value (0). */
  delay?: number
  /** CSS length for `up`, `down`, `left` and `right`. Defaults to the CSS value (`0.75rem`). */
  distance?: string
  /**
   * Milliseconds added per element when several elements are revealed
   * together, in document order, so they appear in cascade. Defaults to `0`.
   */
  stagger?: number
  /** Hide again after leaving the viewport, and reveal on every entry. Defaults to `false`. */
  repeat?: boolean
  /** Scroll container. Defaults to the viewport. */
  root?: Element | Document | null
  /** Grow or shrink the root box. Defaults to `'0px 0px 64px 0px'`: starts just before entering. */
  rootMargin?: string
  /** Share of the element that must be visible, `0` to `1`. Defaults to `0`. */
  threshold?: number
  /**
   * Called when an element is shown: when its transition starts, or right
   * away for elements that were already in view and never hidden.
   */
  onReveal?: (element: Element) => void
  /** Called when a `repeat` element is hidden again after leaving the viewport. */
  onHide?: (element: Element) => void
}

export interface AutoRevealOptions extends RevealOptions {
  /** Elements to reveal. Defaults to `'[data-reveal]'`. */
  selector?: string
  /** Where to look for them. Defaults to `document`. */
  scope?: ParentNode
  /** Also reveal matching elements added later. Defaults to `true`. */
  observe?: boolean
}

export const ATTRIBUTE = 'data-reveal'
export const STATE_ATTRIBUTE = 'data-reveal-state'
export const SCRUB_ATTRIBUTE = 'data-reveal-scrub'
export const STAGGER_ATTRIBUTE = 'data-reveal-stagger'
export const DEFAULT_ROOT_MARGIN = '0px 0px 64px 0px'

export const isEffect = (value: string | null): value is RevealEffect =>
  (REVEAL_EFFECTS as readonly string[]).includes(value ?? '')

/** `"0.6s, 200ms"` → `[600, 200]`. */
export const toMilliseconds = (list: string): number[] =>
  list.split(',').map(part => {
    const value = parseFloat(part)
    if (!Number.isFinite(value)) return 0
    return part.trim().endsWith('ms') ? value : value * 1000
  })

export const ms = (value: number) => `${Math.max(0, value)}ms`
