import { describe, expect, test } from 'bun:test';
import revision from '../src/data/revision.json';
import { getReferenceSheets } from '../src/lib/notebook-reference';

describe('Explanation-only miniature reference', () => {
  const reference = getReferenceSheets(revision.sheets);
  test('excludes October assessments and booklet exercises', () => {
    expect(reference.length).toBe(96);
    expect(reference.some(s => s.id.startsWith('eval-') || s.id.startsWith('booklet-'))).toBe(false);
  });
  test('preserves every original teaching page and its order without rewriting', () => {
    const originals = revision.sheets.filter(s => s.sourcePages && !s.id.startsWith('booklet-'));
    expect(reference).toEqual(originals);
    for (const sheet of reference) expect(sheet).toBe(revision.sheets.find(s => s.id === sheet.id));
    expect(new Set(reference.map(s => s.chapter)).size).toBe(13);
  });
});