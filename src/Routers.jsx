import { createBrowserRouter } from "react-router-dom";
import MainPage from "./Page/MainPage";
import BooksLayout from "./Component/Layout/BooksLayout";
// import { BookTable } from "./Page/Books/BooksTable";
import { AddBookForm } from "./Page/Books/BooksForm";
import LandingLayout from "./Component/Layout/LandingLayout";
import MembersLayout from "./Component/Layout/MembersLayout";
import MemberTable from "./Page/Members/MemberTable";
import MemberForm from "./Page/Members/MemberForm";
import TransactionsLayout from "./Component/Layout/TransactionsLayout";
import BorrowsTable from "./Page/Transactions/BorrowsTable";
import ReturnsForms from "./Page/Transactions/ReturnsForms";
import { BookTable2 } from "./Page/Books/BooksTable2";
import SearchBooks from "./Page/Books/SearchBooks";
import DetailBooks from "./Page/Books/DetailBooks";
import SearchBooksLayout from "./Component/Layout/SearchBooksLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    // errorElement: <div>404 Not Found</div>,
    children: [
      { path: "", element: <MainPage /> },
      {
        path: "/searchbooks",
        element: <SearchBooksLayout />,
        children: [
          { path: "", element: <SearchBooks /> },
          { path: "/searchbooks/:id", element: <DetailBooks /> },
        ],
      },
      {
        path: "/books",
        element: <BooksLayout />,
        children: [
          { path: "", element: <BookTable2 /> },
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
