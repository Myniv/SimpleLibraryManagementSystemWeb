import { FooterFunction } from "./Foot";
import { HeaderFunction } from "./Head";
import BooksPage from "./Page/BooksPage";

function App() {
  return (
    <>
      <HeaderFunction />
      <BooksPage/>
      <FooterFunction />
    </>
  );
}

export default App;
