export interface Searcher {
  doSearch(userId: string, keyword: string): string | null;
}
