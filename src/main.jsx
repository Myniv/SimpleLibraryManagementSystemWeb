import React from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Page/MainPage";
import BooksPage from "./Page/BooksPage";
import { BookTable } from "./Component/Books/BooksTable";
import { AddBookForm } from "./Component/Books/BooksForm";
import LandingPage from "./Page/LandingPage";
import MembersPage from "./Page/MembersPage";
import MemberTable from "./Component/Members/MemberTable";
import MemberForm from "./Component/Members/MemberForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { path: "", element: <MainPage /> },
      {
        path: "/books",
        element: <BooksPage />,
        children: [
          { path: "", element: <BookTable /> },
          { path: "/books/add", element: <AddBookForm /> },
          { path: "/books/:id", element: <AddBookForm /> },
        ],
      },
      {
        path: "/members",
        element: <MembersPage />,
        children: [
          { path: "", element: <MemberTable /> },
          { path: "/members/add", element: <MemberForm /> },
          { path: "/members/:id", element: <MemberForm /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />

    {/* <App/> */}
  </React.StrictMode>
);
