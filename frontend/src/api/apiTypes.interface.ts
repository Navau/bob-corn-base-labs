export interface IPageResponse<T> {
  data: Array<T>;
  total: number;
  page: number;
  lastPage: number;
}
