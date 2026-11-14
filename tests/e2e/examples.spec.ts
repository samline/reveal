// The website shows each example twice: a live preview and copyable files
// (site/examples.ts) that load the browser bundle. These tests run the copyable
// files against the built bundle, so the code people copy keeps working.
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

import revealExamples from '../../site/examples'

const bundle = (pkg: string) =>
  fileURLToPath(new URL(`../../dist/browser/${pkg}.global.js`, import.meta.url))

type Example = { id: string; files: { html: string; css?: string; js: string } }

const open = async (page: import('@playwright/test').Page, pkg: string, example: Example) => {
  await page.setContent(
    `<!doctype html><html><head><style>${example.files.css ?? ''}</style></head><body><main>${example.files.html}</main></body></html>`
  )
  await page.addScriptTag({ path: bundle(pkg) })
  await page.addScriptTag({ content: example.files.js })
}

const find = <T extends Example>(list: readonly T[], id: string) =>
  list.find(item => item.id === id)!

test.describe('reveal copyable examples', () => {
  // Like the copied index.html: the stylesheet in the head and the bundle,
  // then the example script, at the end of the body while the page parses.
  const openDocument = async (page: import('@playwright/test').Page, example: Example) => {
    const css = readFileSync(
      fileURLToPath(new URL('../../dist/style.css', import.meta.url)),
      'utf8'
    )
    const script = readFileSync(bundle('reveal'), 'utf8')
    await page.setContent(
      `<!doctype html><html><head><style>${css}</style><style>${example.files.css ?? ''}</style></head><body><main>${example.files.html}</main><script>${script}</script><script>${example.files.js}</script></body></html>`
    )
  }
  const scrollBox = (page: import('@playwright/test').Page, top: number) =>
    page.locator('#page').evaluate((box, y) => box.scrollTo(0, y), top)

  test('the grid waits below the fold, then cascades in document order', async ({ page }) => {
    await openDocument(page, find(revealExamples, 'cascade'))
    const items = page.locator('.grid li')
    await expect(items.first()).toHaveAttribute('data-reveal-state', 'pending')

    await scrollBox(page, 10_000)
    await expect(items.last()).toHaveAttribute('data-reveal-state', 'revealed')
    const delays = await items.evaluateAll(list =>
      list.map(item => (item as HTMLElement).style.getPropertyValue('--reveal-delay'))
    )
    expect(delays.slice(0, 3)).toEqual(['', '90ms', '180ms'])
  })

  test('repeat effects hide when scrolled away and play again on return', async ({ page }) => {
    await openDocument(page, find(revealExamples, 'effects'))
    const blur = page.locator('[data-reveal="blur"]')
    await expect(blur).toHaveAttribute('data-reveal-state', 'pending')

    await scrollBox(page, 10_000)
    await expect(blur).toHaveAttribute('data-reveal-state', 'revealed')
    await scrollBox(page, 0)
    await expect(blur).toHaveAttribute('data-reveal-state', 'pending')
    await scrollBox(page, 10_000)
    await expect(blur).not.toHaveAttribute('data-reveal-state', 'pending')
  })

  test('scrub runs on CSS alone and reports support', async ({ page }) => {
    await openDocument(page, find(revealExamples, 'scrub'))
    const supported = await page.evaluate(() => CSS.supports('animation-timeline: view()'))
    await expect(page.locator('#support')).toHaveText(supported ? /are supported/ : /stays visible/)
    await expect(page.locator('[data-reveal-scrub]').first()).not.toHaveAttribute(
      'data-reveal-state',
      /.*/
    )
  })
})
