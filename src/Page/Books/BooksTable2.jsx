/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import LoadingState from "../../Component/Elements/LoadingState";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import UserService from "../../service/book/BookService";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

const fetchBooks = async ({ page, pageSize }) => {
  const { data } = await UserService.getSearch(page, pageSize);
  console.log(data.data);
  return data;
};

const BookTable2 = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", currentPage, pageSize],
    queryFn: () => fetchBooks({ page: currentPage, pageSize }),
    keepPreviousData: true,
  });

  //   useEffect(() => {
  //     setLoading(true);
  //     axios
  //       .get("http://localhost:5265/api/Books")
  //       .then((res) => {
  //         const sortedBooks = res.data.sort((a, b) => a.bookid - b.bookid);
  //         setBook(sortedBooks);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         setErrorMessage(err.message);
  //         console.log(err);
  //       });
  //   }, [setBook]);

  //   useEffect(() => {
  //     if (deleteBooks) {
  //       const deletingBooks = () => {
  //         setLoading(true);
  //         axios
  //           .delete(`http://localhost:5265/api/Users/${deleteBooksId}`)
  //           .then((res) => {
  //             const sortedBooks = res.data.sort((a, b) => a.bookid - b.bookid);
  //             setBook(sortedBooks);
  //             setDeleteBooks(false);
  //             setLoading(false);
  //           })
  //           .catch((err) => {
  //             setDeleteBooks(false);
  //             setLoading(false);
  //             console.log(err);
  //           });
  //       };
  //       DeleteConfirmation({ deleteData: () => deletingBooks });
  //     }
  //   }, [deleteBooks]);

  const onEditingBook = (id) => {
    navigate(`/books/${id}`);
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

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorMessage errorMessage="Error" />
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-between">
            <h2>Book Table</h2>
            <PrimaryButton onClick={onAddBook} buttonName={"Add Book"} />
          </div>

          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Publisher</th>
                <th scope="col">ISBN</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((book) => (
                <tr scope="row" key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
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
        </div>
      )}
    </>
  );
};

export { BookTable2 };
