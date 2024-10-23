import { useState } from "react";

import { BookTable } from "./BooksTable";
import { AddBookForm } from "./Form";
import { FooterFunction } from "./Foot";
import { HeaderFunction } from "./Head";

function App() {
  return (
    <>
      <HeaderFunction />
      <BookTable />
      <AddBookForm />
      <FooterFunction />
    </>
  );
}

export default App;
