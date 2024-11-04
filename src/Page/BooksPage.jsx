import { useState } from "react";
import { BookTable } from "../Component/BooksTable";
import { AddBookForm } from "../Component/BooksForm";

function BooksPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [book, setBook] = useState([]);
  
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
