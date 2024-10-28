import { BookTable } from "./BooksTable";
import { AddBookForm } from "./Form";
import { FooterFunction } from "./Foot";
import { HeaderFunction } from "./Head";
import { useState } from "react";
import { bookList } from "./Books";

function App() {
  const [book, setBook] = useState(bookList);

  return (
    <>
      <HeaderFunction />
      <div className="container">
        <BookTable book={book} setBook={setBook} />
        <AddBookForm book={book} setBook={setBook} />
      </div>
      <FooterFunction />
    </>
  );
}

export default App;
