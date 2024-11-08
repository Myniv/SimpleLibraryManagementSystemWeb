import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmations";

const BookTable = () => {
  const { book, setBook, setIsEditing, setSelectedBook } = useOutletContext();

  const navigate = useNavigate();

  const [filteredBooks, setFilteredBooks] = useState(book);

  //if u want to add more filter, add this function too
  const [category, setCategory] = useState("");

  const categorys = Array.from(new Set(book.map((book) => book.category)));

  useEffect(() => {
    setFilteredBooks(
      book.filter((book) => {
        return (
          !category || category === book.category
          //If u want to add more filter category, add here with &&
        );
      })
    );
    //dont forget this below too
  }, [category, book]);

  useEffect(() => {
    //this is to read or get from the local storage
    const storedBooks = JSON.parse(localStorage.getItem("book")) || [];
    setBook(storedBooks);
  }, [setBook]);

  const clearFilters = () => {
    setCategory("");
  };

  const onDeleteBook = (id) => {
    const isDelete = () => {
      const storedBooks = JSON.parse(localStorage.getItem("book")) || [];
      const deleteBooks = storedBooks.filter((b) => b.id !== id);

      //This is to add to the local storage
      localStorage.setItem("book", JSON.stringify(deleteBooks));
      setBook(deleteBooks);
    };
    DeleteConfirmation({ deleteData: () => isDelete() });
  };

  const onEditingBook = (id) => {
    const selectBook = book.find((book) => book.id === id);
    setSelectedBook(selectBook);
    setIsEditing(true);
    navigate(`/books/${id}`);
  };

  const onAddBook = () => {
    navigate("/books/add");
  };
  return (
    <div className="m-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Book Table</h2>
        <button className="btn btn-primary m-1 me-3" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <select
        className="form-select form-select-sm mb-3"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="" defaultValue="">
          Select Category
        </option>
        {categorys.map((category) => {
          return <option key={category}>{category}</option>;
        })}
      </select>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col">Publication Year</th>
            <th scope="col">ISBN</th>
            <th scope="col">Availability</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr scope="row" key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.publicationyear}</td>
              <td>{book.isbn}</td>
              <td>{book.availability ? "Available" : "Not Available"}</td>
              <td>
                <div className="d-grid gap-2 d-md-flex justify-content-md">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onEditingBook(book.id)}
                    value={"edit"}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onDeleteBook(book.id)}
                    value={"delete"}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="8">
              <div className="d-flex justify-content-end">
                <div className="d-grid gap-2 col-2">
                  <button
                    type="button"
                    className="btn btn-primary  btn-block me-1"
                    onClick={onAddBook}
                  >
                    Add Book
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export { BookTable };
