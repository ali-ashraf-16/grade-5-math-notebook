import { expect, test } from 'bun:test';
import revision from '../src/data/revision.json';
import { getOctoberEditionSheets } from '../src/lib/october-edition';

test('source-order edition begins with one welcome page before all unchanged solutions', () => {
  const pages = getOctoberEditionSheets(revision.octoberSourceOrderSheets);
  expect(pages[0]?.id).toBe('october-welcome');
  expect(pages[1]?.id).toBe('october-mcq-1');
  expect(pages.length).toBe(revision.octoberSourceOrderSheets.length + 1);
  expect(pages.slice(1)).toEqual(revision.octoberSourceOrderSheets);
});