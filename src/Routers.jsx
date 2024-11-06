import { createBrowserRouter } from "react-router-dom";
import MainPage from "./Page/MainPage";
import BooksPage from "./Page/BooksPage";
import { BookTable } from "./Component/Layout/Books/BooksTable";
import { AddBookForm } from "./Component/Layout/Books/BooksForm";
import LandingPage from "./Page/LandingPage";
import MembersPage from "./Page/MembersPage";
import MemberTable from "./Component/Layout/Members/MemberTable";
import MemberForm from "./Component/Layout/Members/MemberForm";
export const router = createBrowserRouter([
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
