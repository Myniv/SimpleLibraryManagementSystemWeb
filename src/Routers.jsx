import { createBrowserRouter } from "react-router-dom";
import MainPage from "./Page/MainPage";
import BooksLayout from "./Component/Layout/BooksLayout";
import { BookTable } from "./Page/Books/BooksTable";
import { AddBookForm } from "./Page/Books/BooksForm";
import LandingLayout from "./Component/Layout/LandingLayout";
import MembersLayout from "./Component/Layout/MembersLayout";
import MemberTable from "./Page/Members/MemberTable";
import MemberForm from "./Page/Members/MemberForm";
import TransactionsLayout from "./Component/Layout/TransactionsLayout";
import BorrowsTable from "./Page/Transactions/BorrowsTable";
import ReturnsForms from "./Page/Transactions/ReturnsForms";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { path: "", element: <MainPage /> },
      {
        path: "/books",
        element: <BooksLayout />,
        children: [
          { path: "", element: <BookTable /> },
          { path: "/books/add", element: <AddBookForm /> },
          { path: "/books/:id", element: <AddBookForm /> },
        ],
      },
      {
        path: "/members",
        element: <MembersLayout />,
        children: [
          { path: "", element: <MemberTable /> },
          { path: "/members/add", element: <MemberForm /> },
          { path: "/members/:id", element: <MemberForm /> },
        ],
      },
      {
        path: "/transactions",
        element: <TransactionsLayout />,
        children: [
          { path: "", element: <BorrowsTable /> },
          { path: "/transactions/borrow", element: <ReturnsForms /> },
          { path: "/transactions/return/:id", element: <ReturnsForms /> },
        ],
      },
    ],
  },
]);
