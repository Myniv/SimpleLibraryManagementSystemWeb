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
import Login from "./Page/Login";
import Profile from "./Page/Profile";
import PrivateRoute from "./Page/PrivateRoutes";
import RegisterUser from "./Page/Auth/RegisterUser";
// import UnauthorizedLayout from "./Component/Layout/UnauthorizedLayout";
import UploadFiles from "./Page/Books/UploadFiles";
import BookRequestForm from "./Page/Books/BookRequestForm";
import BooksApproval from "./Page/Books/BooksApproval";
import BookRequestTable2 from "./Page/Books/BookRequestTable2";
import BooksRequestApprovedLayout from "./Component/Layout/BookRequestApprovedLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute
            allowedRoles={["Librarian", "Library Manager", "Library User"]}
          />
        ),
        children: [
          { path: "/", element: <MainPage /> },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/searchbooks",
            element: <SearchBooksLayout />,
            children: [
              { path: "/searchbooks", element: <SearchBooks /> },
              { path: "/searchbooks/:id", element: <DetailBooks /> },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["Library User"]} />,
        children: [
          {
            path: "/bookrequest",
            element: <BookRequestForm />,
          },
        ],
      },

      {
        element: (
          <PrivateRoute allowedRoles={["Librarian", "Library Manager"]} />
        ),
        children: [
          {
            path: "/",
            element: <BooksRequestApprovedLayout />,
            children: [
              {
                path: "/bookapproval/:id",
                element: <BooksApproval />,
              },
              {
                path: "/bookrequesttable",
                element: <BookRequestTable2 />,
              },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["Librarian"]} />,
        children: [
          {
            path: "/books",
            element: <BooksLayout />,
            children: [
              { path: "", element: <BookTable2 /> },
              { path: "/books/add", element: <AddBookForm /> },
              { path: "/books/:id", element: <AddBookForm /> },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["Library Manager"]} />,
        children: [
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
      {
        //For unauthorized user if already login and want to open the unauthorized pages
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <RegisterUser /> },
          { path: "/upload", element: <UploadFiles /> },
        ],
      },
    ],
  },
]);
