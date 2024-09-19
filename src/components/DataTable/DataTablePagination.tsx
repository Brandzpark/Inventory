import { IPaginated } from "@/typings/typings";
import React, { useCallback } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addFilter } from "@/lib/helpers";

type Props = { paginationData: IPaginated };

export default function DataTablePagination({ paginationData }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { hasNextPage, hasPrevPage, totalPages, page, prevPage, nextPage } =
    paginationData;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const createPaginationItems = () => {
    const items = [];

    // Always add the first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          href={"?" + createQueryString("page", "1")}
          isActive={page === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Add ellipsis if needed
    if (page > 4) {
      items.push(<PaginationEllipsis key="ellipsis1" />);
    }

    // Add surrounding pages
    for (
      let i = Math.max(2, page - 2);
      i <= Math.min(totalPages - 1, page + 2);
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={"?" + createQueryString("page", i?.toString())}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis if needed
    if (page < totalPages - 3) {
      items.push(<PaginationEllipsis key="ellipsis2" />);
    }

    // Always add the last page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href={"?" + createQueryString("page", totalPages?.toString())}
            isActive={page === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className="mb-5">
      <PaginationContent>
        {page != 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={"?" + createQueryString("page", prevPage)}
            />
          </PaginationItem>
        )}
        {createPaginationItems()}
        {page !== totalPages && (
          <PaginationItem>
            <PaginationNext href={"?" + createQueryString("page", nextPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
