import { BookTable } from "./BooksTable";
import { AddBookForm } from "./Form";
import { FooterFunction } from "./Foot";
import { HeaderFunction } from "./Head";
import { useState } from "react";
import { bookList } from "./Books";

function App() {
  const [book, setBook] = useState(bookList);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      <HeaderFunction />
      <div className="container">
        <BookTable
          book={book}
          setBook={setBook}
          setIsEditing={setIsEditing}
          setSelectedBook={setSelectedBook}
        />
        <AddBookForm
          book={book}
          setBook={setBook}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          selectedBook={selectedBook}
        />
      </div>
      <FooterFunction />
    </>
  );
}

export default App;
