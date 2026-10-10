"""Source-order edition rules verified against month10.pdf."""
import json
from pathlib import Path
import unittest

DATA = json.loads((Path(__file__).resolve().parents[1] / 'src/data/revision.json').read_text())

class SourceOrderRules(unittest.TestCase):
    def test_october_keeps_original_section_order(self):
        ordered = DATA['octoberSourceOrderSheets'][:55]
        self.assertEqual([(s['sourceSection'], s['sourceNumber']) for s in ordered],
                         [('mcq', n) for n in range(1, 13)] + [('written', n) for n in range(1, 44)])
        self.assertEqual(len({s['id'] for s in ordered}), 55)
        for s in ordered:
            self.assertTrue(s['steps'])
            self.assertTrue(s['answer'])

    def test_booklet_appended_without_changes(self):
        booklet = [s for s in DATA['assessmentSheets'] if s['id'].startswith('booklet-')]
        self.assertEqual(len(booklet), 14)
        self.assertEqual(DATA['octoberSourceOrderSheets'][55:], booklet)

    def test_nonconsecutive_questions_are_separate(self):
        sheets = DATA['octoberSourceOrderSheets']
        self.assertEqual(sheets[20]['answer'], '3, 6, 9')
        self.assertEqual(sheets[21]['answer'], '7, 14, 21')
        self.assertIn('x + 24 = y', sheets[15]['question'])
        self.assertNotIn('2.4', sheets[15]['answer'])
        self.assertIn('0.459 × 100', sheets[23]['question'])
        self.assertIn('7.23 ÷ 10', sheets[24]['question'])

if __name__ == '__main__':
    unittest.main()