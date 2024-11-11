/* eslint-disable react/prop-types */
const Pagination = ({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <button
        type="button"
        className="btn btn-secondary me-2"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
