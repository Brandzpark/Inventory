export type BreadcrumbType = {
  title: string;
  href: string;
};

export type IPaginated = {
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolen;
  hasNextPage: boolen;
  prevPage: string;
  nextPage: string;
};
