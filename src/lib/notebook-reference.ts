/** Keep the supplied teaching pages verbatim; exclude examination exercises. */
export function getReferenceSheets<T extends { id: string }>(sheets: T[]): T[] {
  return sheets.filter(sheet => !sheet.id.startsWith('eval-') && !sheet.id.startsWith('booklet-'));
}