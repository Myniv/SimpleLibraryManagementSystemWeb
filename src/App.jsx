import { useState } from "react";

import { BookTable } from "./BooksTable";

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
    </>
  );
}

export default App;
