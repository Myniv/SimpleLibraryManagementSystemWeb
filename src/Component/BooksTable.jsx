/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const BookTable = ({ book, setBook, setIsEditing, setSelectedBook }) => {

  //this is to represent the bookList
  //usestate is for save data and change state
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
    const storedBooks = JSON.parse(localStorage.getItem("book")) || [];
    setBook(storedBooks);
  }, []);

  const clearFilters = () => {
    setCategory("");
  };

  const onDeleteBook = (id) => {
    const storedBooks = JSON.parse(localStorage.getItem("book")) || [];
    const deleteBooks = storedBooks.filter((b) => b.id !== id);
    localStorage.setItem("book", JSON.stringify(deleteBooks));
    setBook(deleteBooks); 

    alert("The book has been deleted!");
  };

  const onEditingBook = (id) => {
    const selectBook = book.find((book) => book.id === id);
    setSelectedBook(selectBook);
    setIsEditing(true);
  };

  return (
    <div>
      <br></br>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Book Table</h2>
        <button className="btn btn-primary m-1" onClick={clearFilters}>
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
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr scope="row" key={book.id}>
              <td key={book.id}>{book.id}</td>
              <td key={book.title}>{book.title}</td>
              <td key={book.author}>{book.author}</td>
              <td key={book.category}>{book.category}</td>
              <td key={book.publicationyear}>{book.publicationyear}</td>
              <td key={book.isbn}>{book.isbn}</td>
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
        </tbody>
      </table>
    </div>
  );
};

export { BookTable };
