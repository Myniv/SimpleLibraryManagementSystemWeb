import { useState } from "react";
import { Outlet} from "react-router-dom";
import { HeaderFunction } from "../Head";
import { FooterFunction } from "../Foot";

function BooksPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [book, setBook] = useState([]);

  return (
    <>
        <HeaderFunction/>
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
        <FooterFunction/>
    </>
  );
}

export default BooksPage;
