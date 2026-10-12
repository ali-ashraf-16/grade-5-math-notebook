import plan from '@/data/reference-plan.json';

type TeachingSheet = {
  id: string; chapter: string; title: string; rule?: string; question?: string;
  steps?: string[]; answer?: string; note?: string; sourcePages?: number[];
};

/** Assemble only literal source content; the JSON plan selects essential patterns. */
export function getReferenceSheets<T extends TeachingSheet>(sheets: T[]) {
  const originals = new Map(sheets.filter(s => !s.id.startsWith('eval-') && !s.id.startsWith('booklet-')).map(s => [s.id, s]));
  return Object.entries(plan).flatMap(([chapter, pages]) => pages.map((ids, page) => {
    const patterns = ids.map(id => {
      const source = originals.get(id);
      if (!source) throw new Error(`Missing original teaching pattern: ${id}`);
      return source;
    });
    return {
      id: `reference-${chapter}-${page + 1}`, chapter,
      title: `${patterns[0]?.title ?? chapter} · ${page + 1}/${pages.length}`,
      referencePatterns: patterns,
      sourcePages: [...new Set(patterns.flatMap(s => s.sourcePages ?? []))],
    };
  }));
}