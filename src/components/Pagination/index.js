import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.scss";

const ResultPagination = ({ pageCount, pageRange, onSelect, current }) => {
  return (
    <div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={pageRange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        onPageChange={onSelect}
        forcePage={current - 1}
      />
    </div>
  );
};

export default ResultPagination;
