import { useState } from "react";
import { AddBookForm } from "./Page/Component/BooksForm";
import { BookTable } from "./Page/Component/BooksTable";
import { FooterFunction } from "./Foot";
import { HeaderFunction } from "./Head";
// import BooksPage from "./Page/BooksPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [book, setBook] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/books",
      element: (
        <BookTable
          book={book}
          setBook={setBook}
          setIsEditing={setIsEditing}
          setSelectedBook={setSelectedBook}
        />
      ),
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: "/books/add",
      element: (
        <AddBookForm
          book={book}
          setBook={setBook}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          selectedBook={selectedBook}
        />
      ),
    },
  ]);

  return (
    <>
      <HeaderFunction />
      <RouterProvider router={router} />
      <FooterFunction />
    </>
  );
}

export default App;
