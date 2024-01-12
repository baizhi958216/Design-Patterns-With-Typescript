export interface AbstractIterator {
  next(): void;
  isLast(): boolean;
  previous(): void;
  isFirst(): boolean;
  getNextItem(): object;
  getPreviousItem(): object;
}
