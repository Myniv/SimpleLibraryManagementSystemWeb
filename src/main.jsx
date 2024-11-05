import React from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Page/MainPage";
import BooksPage from "./Page/BooksPage";
import { BookTable } from "./Component/Books/BooksTable";
import { AddBookForm } from "./Component/Books/BooksForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/books",
    element: <BooksPage />,
    children: [
      { path: "", element: <BookTable /> },
      { path: "/books/add", element: <AddBookForm /> },
      { path: "/books/:id", element: <AddBookForm /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />

    {/* <App/> */}
  </React.StrictMode>
);
