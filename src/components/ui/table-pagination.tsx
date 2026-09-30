import { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

// Helper function to get the button array
const getButtonArray = (
  totalPages: number,
  page: number,
): (number | "ellipsis")[] => {
  // If the total number of pages is less than or equal to 7, return all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // If the current page is less than or equal to 4, show the first 5 pages
  if (page <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  // If the current page is greater than or equal to the total number of pages minus 3, show the last 5 pages
  if (page >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // Otherwise, show the current page, an ellipsis, and the adjacent pages
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
};

// TablePagination component
interface Props {
  totalPages: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
  page: number;
}

const TablePagination = ({ totalPages, handlePageChange, page }: Props) => {
  // Function to handle page navigation
  const goToPage = (page: number) => {
    handlePageChange(page);
  };

  // If the total number of pages is less than or equal to 1, return null
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(page - 1)}
            aria-disabled={page === 1}
            className={
              page === 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        {getButtonArray(totalPages, page).map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                onClick={() => handlePageChange(item)}
                isActive={page === item}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(page + 1)}
            aria-disabled={page === totalPages}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
