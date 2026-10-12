import { describe, expect, test } from 'bun:test';
import revision from '../src/data/revision.json';
import { getReferenceSheets } from '../src/lib/notebook-reference';

describe('Condensed lesson reference', () => {
  const reference = getReferenceSheets(revision.sheets);
  test('excludes October assessments and booklet exercises', () => {
    expect(reference.length).toBeLessThan(30);
    expect(reference.flatMap(s => s.referencePatterns).some(s => s.id.startsWith('eval-') || s.id.startsWith('booklet-'))).toBe(false);
  });
  test('uses only original examples, rules, steps and exam warnings without rewriting', () => {
    for (const sheet of reference.flatMap(s => s.referencePatterns)) {
      expect(sheet).toBe(revision.sheets.find(s => s.id === sheet.id));
      expect(sheet.steps.length).toBeGreaterThan(0);
      expect(sheet.rule.length).toBeGreaterThan(0);
      expect(sheet.note.length).toBeGreaterThan(0);
    }
  });
  test('every supplied teaching lesson has 1–2 pages or maximum 3 for large lessons', () => {
    const chapters = new Set(revision.sheets.filter(s => !s.id.startsWith('eval-') && !s.id.startsWith('booklet-')).map(s => s.chapter));
    expect(new Set(reference.map(s => s.chapter))).toEqual(chapters);
    for (const chapter of chapters) {
      const count = reference.filter(s => s.chapter === chapter).length;
      expect(count).toBeGreaterThanOrEqual(1);
      expect(count).toBeLessThanOrEqual(3);
    }
  });
});