import { useEffect, useState } from "react";

const bookList = [
  {
    title: "One Piece",
    author: "Eiichiro Oda",
    category: "Shonen",
    publicationyear: 1997,
    isbn: 9786230028755,
  },
  {
    title: "Naruto",
    author: "Masashi Kishimoto",
    category: "Shonen",
    publicationyear: 1999,
    isbn: 9781421502403,
  },
  {
    title: "Attack on Titan",
    author: "Hajime Isayama",
    category: "Shonen",
    publicationyear: 2009,
    isbn: 9781612620244,
  },
  {
    title: "Demon Slayer",
    author: "Koyoharu Gotouge",
    category: "Sheinen",
    publicationyear: 2016,
    isbn: 9781974700523,
  },
  {
    title: "My Hero Academia",
    author: "Kohei Horikoshi",
    category: "Sheinen",
    publicationyear: 2014,
    isbn: 9781421582696,
  },
  {
    title: "Death Note",
    author: "Tsugumi Ohba",
    category: "Shonen",
    publicationyear: 2003,
    isbn: 9781421501680,
  },
  {
    title: "Dragon Ball",
    author: "Akira Toriyama",
    category: "Shonen",
    publicationyear: 1984,
    isbn: 9781569319208,
  },
  {
    title: "Fullmetal Alchemist",
    author: "Hiromu Arakawa",
    category: "Sheinen",
    publicationyear: 2001,
    isbn: 9781421540184,
  },
  {
    title: "Bleach",
    author: "Tite Kubo",
    category: "Shonen",
    publicationyear: 2001,
    isbn: 9781421500764,
  },
  {
    title: "Fairy Tail",
    author: "Hiro Mashima",
    category: "Shonen",
    publicationyear: 2006,
    isbn: 9781612622767,
  },
];

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
          (!category || category === bookList.category)
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
