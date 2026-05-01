const { chromium } = require('playwright')
const path = require('path')

const sites = [
  { name: 'tradequoter', url: 'https://tradequoter.co/' },
  { name: 'goldenscent', url: 'https://www.goldenscent.com/' },
  { name: 'almarwan', url: 'https://almarwan.com/' },
  { name: 'tilemountain', url: 'https://www.tilemountain.co.uk/' },
  { name: 'bathroommountain', url: 'https://www.bathroommountain.co.uk/' },
]

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  })

  for (const site of sites) {
    console.log(`Capturing ${site.name}...`)
    const page = await context.newPage()
    try {
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(2000)
      const outPath = path.join(__dirname, '../public/screenshots', `${site.name}.png`)
      await page.screenshot({ path: outPath, fullPage: false })
      console.log(`  ✓ Saved ${site.name}.png`)
    } catch (err) {
      console.log(`  ✗ Failed ${site.name}: ${err.message}`)
    }
    await page.close()
  }

  await browser.close()
  console.log('Done.')
})()
