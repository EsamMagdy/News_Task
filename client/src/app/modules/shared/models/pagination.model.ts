export interface Pagination<T> {
  model: T[];
  totalCount: number;
  totalCountInPages: number;
}
