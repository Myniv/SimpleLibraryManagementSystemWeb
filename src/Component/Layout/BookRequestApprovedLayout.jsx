import { useState } from "react";
import { Outlet } from "react-router-dom";

function BooksRequestApprovedLayout() {
  const [bookReqAppr, setBookReqAppr] = useState([]);

  return (
    <>
      <Outlet
        context={{
          bookReqAppr,
          setBookReqAppr,
        }}
      />
    </>
  );
}

export default BooksRequestApprovedLayout;
