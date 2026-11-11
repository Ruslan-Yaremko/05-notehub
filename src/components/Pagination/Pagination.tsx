import ReactPaginateModule from "react-paginate";
import css from "./Pagination.module.css";

const ReactPaginate =
  (ReactPaginateModule as any).default ?? ReactPaginateModule;
interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={onPageChange}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.previous}
      nextClassName={css.next}
      disabledClassName={css.disabled}
    />
  );
}
