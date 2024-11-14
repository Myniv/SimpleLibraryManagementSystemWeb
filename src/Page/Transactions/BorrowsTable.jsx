import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import LoadingState from "../../Component/Elements/LoadingState";
import Pagination from "../../Component/Widgets/Pagination";

const BorrowsTable = () => {
  const { transactions, setTransactions } = useOutletContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5265/api/Transactions")
      .then((res) => {
        const sortedTransactions = res.data.sort(
          (a, b) => a.transactionid - b.transactionid
        );
        setTransactions(sortedTransactions);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [setTransactions]);

  const onEditingTransaction = (id) => {
    navigate(`/transactions/return/${id}`);
  };

  const onAddTransaction = () => {
    navigate("/transactions/borrow");
  };

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Handle pagination navigation
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      {loading ? (
        <LoadingState />
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Transaction Table</h2>
          </div>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Transaction ID</th>
                <th scope="col">User ID</th>
                <th scope="col">Book ID</th>
                <th scope="col">Borrow Date</th>
                <th scope="col">Borrow Expired</th>
                <th scope="col">Return Date</th>
                <th scope="col">Is Returned</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr scope="row" key={transaction.transactionid}>
                  <td>{transaction.transactionid}</td>
                  <td>{transaction.userid}</td>
                  <td>{transaction.bookid}</td>
                  <td>{transaction.borrowdate}</td>
                  <td>{transaction.borrowexpired}</td>
                  <td>{transaction.returndate || "N/A"}</td>
                  <td>{transaction.isreturned ? "Yes" : "No"}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md">
                      <PrimaryButton
                        disabled={transaction.isreturned ? true : false}
                        onClick={() =>
                          onEditingTransaction(transaction.transactionid)
                        }
                        buttonName={"Return Book"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7">
                  <div className="d-grid gap-2 d-md-flex justify-content-between">
                    <PrimaryButton
                      onClick={onAddTransaction}
                      buttonName={"Borrow Book"}
                      className="btn-sm"
                    />
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      goToPreviousPage={goToPreviousPage}
                      goToNextPage={goToNextPage}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default BorrowsTable;
