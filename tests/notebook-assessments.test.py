"""Checks original-content preservation and assessment placement rules."""
import hashlib
import json
from pathlib import Path
import unittest

DATA = json.loads((Path(__file__).resolve().parents[1] / 'src/data/revision.json').read_text())


class NotebookAssessmentRules(unittest.TestCase):
    def test_original_explanations_preserved_verbatim(self):
        originals = [s for s in DATA['sheets'] if not s['id'].startswith('eval-')]
        digest = hashlib.sha256(json.dumps(originals, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
        self.assertEqual(digest, '406e5ae6e9235d77a5dbed8677706e59d2ec80a116eb01b06e2d714644080477')

    def test_assessments_follow_their_lesson_without_duplicates(self):
        sheets = DATA['sheets']
        assessments = DATA['assessmentSheets']
        self.assertEqual(len(assessments), 30)
        self.assertEqual(len({s['id'] for s in sheets}), len(sheets))
        self.assertEqual([s for s in sheets if s['id'].startswith('eval-')], assessments)
        for chapter in DATA['chapters']:
            indexes = [i for i, s in enumerate(sheets) if s['chapter'] == chapter['id']]
            self.assertGreater(len(indexes), 0)
            self.assertEqual(indexes, list(range(indexes[0], indexes[-1] + 1)))
            lessons = [i for i in indexes if not sheets[i]['id'].startswith('eval-')]
            exams = [i for i in indexes if sheets[i]['id'].startswith('eval-')]
            if lessons and exams:
                self.assertEqual(min(exams), max(lessons) + 1)
            for i in exams:
                self.assertGreater(len(sheets[i]['steps']), 0)
                self.assertTrue(sheets[i]['answer'].strip())

    def test_no_external_challenging_questions(self):
        self.assertNotIn('challengingSheets', DATA)
        self.assertTrue(all(s.get('sourcePages') or s['id'].startswith('eval-') for s in DATA['sheets']))


if __name__ == '__main__':
    unittest.main()