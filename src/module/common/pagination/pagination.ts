import { PaginationResultInterface } from './pagination-results-interface';

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public total: number;
  public page: number;
  public itemsPerPage: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.results = paginationResults.results;
    this.page = paginationResults.page;
    this.itemsPerPage = paginationResults.itemsPerPage;
    this.total = paginationResults.total;
  }
}
