import { useEffect, useState } from "react";
import { bookList } from "./Books";

const BookTable = () => {
  //this is to represent the bookList
  const [filteredBooks, setFilteredBooks] = useState(bookList);

  //if u want to add more filter, add this function too
  const [category, setCategory] = useState("");

  //This is the other way to filter but cant clear so i dont use it

  //   const filterByCategory = (category) => {
  //     setFilteredBooks(
  //       bookList.filter((bookList) => bookList.category === category)
  //     );
  //   };

  //if u want to add more filter, add this function too
  const categorys = Array.from(
    new Set(bookList.map((bookList) => bookList.category))
  );

  useEffect(() => {
    setFilteredBooks(
      bookList.filter((bookList) => {
        return (
          !category || category === bookList.category
          //If u want to add more filter category, add here with &&
        );
      })
    );
    //dont forget this below too
  }, [category]);

  const clearFilters = () => {
    setCategory("");
  };

  return (
    <div>
      {/* This is the jsx of the other way to filter */}
      {/* <select onChange={(e) => filterByCategory(e.target.value)}>
        <option value="" disabled default selected>
          Select Category
        </option>
        {categorys.map((category) => {
          return <option key={category}>{category}</option>;
        })}
      </select> */}
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
        <option value="" default selected>
          Select Category
        </option>
        {categorys.map((category) => {
          return <option key={category}>{category}</option>;
        })}
      </select>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
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
            <tr scope="row" key={book.isbn}>
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
                    value={"edit"}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
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
