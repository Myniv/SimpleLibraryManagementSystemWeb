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

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled default selected>
          Select Category
        </option>
        {categorys.map((category) => {
          return <option key={category}>{category}</option>;
        })}
      </select>

      <button onClick={clearFilters}>Clear</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Kategori</th>
            <th>Publication Year</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.isbn}>
              <td key={book.title}>{book.title}</td>
              <td key={book.nama}>{book.nama}</td>
              <td key={book.author}>{book.author}</td>
              <td key={book.category}>{book.category}</td>
              <td key={book.publicationyear}>{book.publicationyear}</td>
              <td key={book.isbn}>{book.isbn}</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { BookTable };
