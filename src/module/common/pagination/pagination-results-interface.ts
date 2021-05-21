export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  itemsPerPage: number;
  page: number;
  next?: string;
  previous?: string;
}
