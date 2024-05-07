export interface GetListResponse<T> {
  items: T[];
  size: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPage: number;
}
