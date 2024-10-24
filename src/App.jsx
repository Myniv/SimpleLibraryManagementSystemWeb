import { BookTable } from "./BooksTable";
import { AddBookForm } from "./Form";
import { FooterFunction } from "./Foot";
import { HeaderFunction } from "./Head";

function App() {
  return (
    <>
      <HeaderFunction />
      <div className="container">
        <BookTable />
        <AddBookForm />
      </div>
      <FooterFunction />
    </>
  );
}

export default App;
