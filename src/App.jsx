import { useState } from "react";

import { BookTable } from "./BooksTable";
import { AddBookForm } from "./Form";

function App() {
  const currentDate = new Date().toDateString();

  return (
    <>
      <header>
        <title>Library Management</title>
        <h1>Library Management</h1>
        <p>{currentDate}</p>
      </header>
      <BookTable />
      <AddBookForm />
    </>
  );
}

export default App;
