import { useState } from "react";
import { Outlet } from "react-router-dom";

const TransactionsLayout = () => {
  const [transactions, setTransactions] = useState([]);

  return (
    <>
      <Outlet context={{ transactions, setTransactions }} />
    </>
  );
};

export default TransactionsLayout;
