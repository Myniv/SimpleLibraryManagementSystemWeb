/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmations";
import axios from "axios";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import LoadingState from "../../Component/Elements/LoadingState";
import Pagination from "../../Component/Widgets/Pagination";
import ErrorMessage from "../../Component/Elements/ErrorMessage";

const BookTable = () => {
  const { book, setBook } = useOutletContext();

  const navigate = useNavigate();

  const [deleteBooks, setDeleteBooks] = useState(false);
  const [deleteBooksId, setDeleteBooksId] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5238/api/Books")
      .then((res) => {
        const sortedBooks = res.data.sort((a, b) => a.bookid - b.bookid);
        setBook(sortedBooks);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.message);
        console.log(err);
      });
  }, [setBook]);

  useEffect(() => {
    if (deleteBooks) {
      const deletingBooks = () => {
        setLoading(true);
        axios
          .delete(`http://localhost:5265/api/Users/${deleteBooksId}`)
          .then((res) => {
            const sortedBooks = res.data.sort((a, b) => a.bookid - b.bookid);
            setBook(sortedBooks);
            setDeleteBooks(false);
            setLoading(false);
          })
          .catch((err) => {
            setDeleteBooks(false);
            setLoading(false);
            console.log(err);
          });
      };
      DeleteConfirmation({ deleteData: () => deletingBooks });
    }
  }, [deleteBooks]);

  const onEditingBook = (id) => {
    navigate(`/books/${id}`);
  };

  const onAddBook = () => {
    navigate("/books/add");
  };

  // set the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = book.slice(startIndex, startIndex + itemsPerPage);

  // set total pages
  const totalPages = Math.ceil(book.length / itemsPerPage);

  // Handle pagination navigation
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      {loading ? (
        <LoadingState />
      ) : errorMessage ? (
        <ErrorMessage errorMessage={errorMessage}/>
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
                <th scope="col">Publication Year</th>
                <th scope="col">ISBN</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((book) => (
                <tr scope="row" key={book.id}>
                  <td>{book.bookid}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publicationyear}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md">
                      <PrimaryButton
                        onClick={() => onEditingBook(book.bookid)}
                        buttonName={"Edit"}
                      />
                      <DangerButton
                        onClick={() => {
                          setDeleteBooks(true);
                          setDeleteBooksId(book.bookid);
                        }}
                        buttonName={"Delete"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export { BookTable };
