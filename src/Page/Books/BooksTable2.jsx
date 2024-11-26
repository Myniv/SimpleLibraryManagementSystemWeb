/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import LoadingState from "../../Component/Elements/LoadingState";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import BookService from "../../service/book/BookService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import DangerButton from "../../Component/Elements/DangerButton";

const fetchBooks = async ({ page, pageSize, keyword, sortBy, sortOrder }) => {
  const { data } = await BookService.getSearch(
    page,
    pageSize,
    keyword,
    sortBy,
    sortOrder
  );
  return data;
};

const BookTable2 = () => {
  const navigate = useNavigate();

  const { setBook } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["books", currentPage, pageSize, keyword, sortBy, sortOrder],
    queryFn: () =>
      fetchBooks({ page: currentPage, pageSize, keyword, sortBy, sortOrder }),
    placeholderData: keepPreviousData,
  });

  const onDeleteBooks = async (id) => {
    try {
      await BookService.remove(id, "No longer needed"); // Example delete reason
      console.log(`Book with ID ${id} deleted successfully.`);
      refetch();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  const onEditingBook = (id) => {
    // Find the book by id from the data array
    const book = data.data.find((book) => book.bookId === id);

    if (book) {
      // Set the selected book in the outlet context
      setBook(book);

      // Navigate to the edit page for this book
      navigate(`/books/${id}`);
    } else {
      console.error("Book not found");
    }
  };

  const onAddBook = () => {
    navigate("/books/add");
  };

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.total / pageSize));
    }
  }, [data, pageSize, currentPage]);

  const handlePageSizeChange = (event) => {
    // setPageSize(event.target.value);
    setCurrentPage(event.selected + 1);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setCurrentPage(1);
  };

  const handleSorting = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      console.log(sortOrder);
      console.log(sortBy);
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return (
        // <img
        //   className="img-fluid"
        //   src="/img/sortNoSort.png"
        //   alt="sorting"
        //   style={{ width: "20px", height: "20px" }}
        // />
        "↕️"
      );
    }
    if (sortOrder === "asc") {
      return (
        // <img
        //   className="img-fluid"
        //   src="/img/sortAscSort.png"
        //   alt="sorting"
        //   style={{ width: "20px", height: "20px" }}
        // />
        "↑"
      );
    } else {
      return (
        // <img
        //   className="img-fluid"
        //   src="/img/sortDescSort.png"
        //   alt="sorting"
        //   style={{ width: "20px", height: "20px" }}
        // />
        "↓"
      );
    }
    // return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorMessage errorMessage="Error" />
      ) : (
        <div className="m-4">
          <h2>Book Table</h2>
          <div className="d-flex justify-content-end align-items-center mb-3">
            <PrimaryButton
              onClick={onAddBook}
              buttonName={"Add Book"}
              className="me-2"
            />
            <div className="input-group w-auto">
              <span className="input-group-text">Search</span>
              <input
                placeholder="Cari pengguna..."
                type="text"
                className="form-control-sm"
                onChange={handleSearch}
                value={keyword}
              />
            </div>
          </div>

          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">
                  Title
                  <button
                    onClick={() => handleSorting("title")}
                    className="text-decoration-none text-dark p-0"
                  >
                    {getSortIcon("title")}
                  </button>
                </th>
                <th scope="col">Author</th>
                <th scope="col">
                  Publisher
                  <button
                    onClick={() => handleSorting("publisher")}
                    className="text-decoration-none text-dark p-0"
                  >
                    {getSortIcon("publisher")}
                  </button>
                </th>
                <th scope="col">
                  ISBN
                  <button
                    onClick={() => handleSorting("isbn")}
                    className="text-decoration-none text-dark p-0"
                  >
                    {getSortIcon("isbn")}
                  </button>
                </th>
                <th scope="col">
                  Description
                  <button
                    onClick={() => handleSorting("description")}
                    className="text-decoration-none text-dark p-0"
                  >
                    {getSortIcon("description")}
                  </button>
                </th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((book) => (
                <tr scope="row" key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.isbn}</td>
                  <td>{book.description}</td>
                  <td>
                    <div className="d-grid gap-2 justify-content-md">
                      <PrimaryButton
                        onClick={() => onEditingBook(book.bookId)}
                        buttonName={"Edit"}
                      />
                      <DangerButton
                        onClick={() => {
                          // setDeleteBooks(true);
                          // setDeleteBooksId(book.bookId);
                          onDeleteBooks(book.bookId);
                        }}
                        buttonName={"Delete"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-between">
            <div className="input-group w-auto">
              <select
                className="form-select-sm"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="3">3</option>
                <option value="6">6</option>
              </select>
            </div>
            <ReactPaginate
              previousLabel={
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              }
              nextLabel={
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={currentPage === pageCount}
                >
                  Next
                </button>
              }
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageSizeChange}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
          {/* <SearchBooks /> */}
        </div>
      )}
    </>
  );
};

export { BookTable2 };
