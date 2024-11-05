import { useState } from "react";
import { Outlet} from "react-router-dom";


function BooksPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [book, setBook] = useState([]);

  return (
    <>
        <Outlet
          context={{
            book,
            setBook,
            isEditing,
            setIsEditing,
            selectedBook,
            setSelectedBook,
          }}
        />
    </>
  );
}

export default BooksPage;
