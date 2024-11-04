import { useState } from "react";
import { BookTable } from "../Component/BooksTable";
import { AddBookForm } from "../Component/BooksForm";
import { bookList } from "../Component/Books";

function BooksPage() {
  const [book, setBook] = useState(bookList);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
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
    </>
  );
}

export default BooksPage;
