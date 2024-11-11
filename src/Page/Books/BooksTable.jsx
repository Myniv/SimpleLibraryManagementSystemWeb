import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmations";
import axios from "axios";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import LoadingState from "../../Component/Elements/LoadingState";

const BookTable = () => {
  const { book, setBook } = useOutletContext();

  const navigate = useNavigate();

  const [deleteBooks, setDeleteBooks] = useState(false);
  const [deleteBooksId, setDeleteBooksId] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5265/api/Books")
      .then((res) => {
        const sortedBooks = res.data.sort((a, b) => a.bookid - b.bookid);
        setBook(sortedBooks);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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
  return (
    <>
      {loading ? (
        <LoadingState />
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Book Table</h2>
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
              {book.map((book) => (
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
              <tr>
                <td colSpan="8">
                  <div className="d-flex justify-content-end">
                    <div className="d-grid gap-2 col-2">
                      <PrimaryButton
                        onClick={onAddBook}
                        buttonName={"Add Book"}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export { BookTable };
