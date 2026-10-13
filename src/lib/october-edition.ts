import welcomeSheet from '@/data/october-welcome.json';

// The cover is rendered separately; this is the first page immediately after it.
export function getOctoberEditionSheets<T>(sourceSheets: T[]) {
  return [welcomeSheet, ...sourceSheets];
}