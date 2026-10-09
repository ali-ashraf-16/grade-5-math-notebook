"""End-to-end checks for the requested A4 edition printing rules.

Run: python3 tests/notebook-print.test.py
"""
import asyncio
import re
import unittest
from playwright.async_api import async_playwright


class NotebookPrintRules(unittest.TestCase):
    def test_original_is_a4_portrait(self):
        asyncio.run(self.check_edition('النسخة الأصلية (صفحة A4)', 210, 297))

    def test_two_up_is_two_pages_per_landscape_a4(self):
        asyncio.run(self.check_edition('نسخة صفحتين جنب بعض (A4 أفقي)', 297, 210, paired=True))

    def test_focused_revision_is_a4_portrait(self):
        asyncio.run(self.check_edition('تقييمات أكتوبر محلولة', 210, 297))

    async def check_edition(self, label, width_mm, height_mm, paired=False):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page(viewport={'width': 1280, 'height': 1800})
            await page.goto('http://localhost:8080', wait_until='networkidle')
            await page.get_by_role('button', name=label, exact=True).click()
            await page.evaluate('document.fonts.ready')
            await page.emulate_media(media='print')
            pdf = await page.pdf(prefer_css_page_size=True, print_background=True)
            sizes = re.findall(rb'/MediaBox\s*\[([^]]+)\]', pdf)
            self.assertGreater(len(sizes), 0)
            for size in sizes:
                _, _, width, height = map(float, size.split())
                self.assertAlmostEqual(width * 25.4 / 72, width_mm, delta=0.3)
                self.assertAlmostEqual(height * 25.4 / 72, height_mm, delta=0.3)
            if paired:
                count = await page.locator('.paper').count()
                self.assertEqual(len(re.findall(rb'/Type /Page\b', pdf)), (count + 1) // 2)
            await browser.close()
if __name__ == "__main__":
    unittest.main()
