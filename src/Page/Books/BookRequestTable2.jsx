import { useEffect, useState } from "react";
import BookService from "../../service/book/BookService";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import LoadingState from "../../Component/Elements/LoadingState";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Component/Widgets/Pagination";

const BookRequestTable2 = () => {
  const [bookReqList, setBookReqList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting state
  const [sorting, setSorting] = useState({
    key: "processId",
    direction: "asc",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    BookService.getBookRequestList()
      .then((res) => {
        const sortedBookReq = res.data.sort(
          (a, b) => a.processId - b.processId
        );
        setBookReqList(sortedBookReq);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err.message);
        console.log(err);
      });
  }, []);

  const handleSort = (key) => {
    const direction =
      sorting.key === key && sorting.direction === "asc" ? "desc" : "asc";
    setSorting({ key, direction });

    const sortedData = [...bookReqList].sort((a, b) => {
      const valA = a[key] ? a[key].toString().toLowerCase() : ""; // Normalize strings
      const valB = b[key] ? b[key].toString().toLowerCase() : "";

      if (!isNaN(valA) && !isNaN(valB)) {
        // Numerical sort
        return direction === "asc" ? valA - valB : valB - valA;
      } else {
        // String sort
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
    });

    setBookReqList(sortedData);
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = bookReqList.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(bookReqList.length / itemsPerPage);

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorMessage errorMessage="Error" />
      ) : (
        <div className="m-4">
          <h2>Book Request List</h2>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col" onClick={() => handleSort("processId")}>
                  ID
                  {sorting.key === "processId"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("title")}>
                  Title
                  {sorting.key === "title"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("author")}>
                  Author
                  {sorting.key === "author"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("publisher")}>
                  Publisher
                  {sorting.key === "publisher"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("isbn")}>
                  ISBN
                  {sorting.key === "isbn"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("status")}>
                  Current Status
                  {sorting.key === "status"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("requestDate")}>
                  Submission Date
                  {sorting.key === "requestDate"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((book) => (
                <tr scope="row" key={book.processId}>
                  <td>{book.processId}</td>
                  <td>{book.bookRequest?.title || "N/A"}</td>
                  <td>{book.bookRequest?.author || "N/A"}</td>
                  <td>{book.bookRequest?.publisher || "N/A"}</td>
                  <td>{book.bookRequest?.isbn || "N/A"}</td>
                  <td
                    style={{
                      backgroundColor:
                        book.status === "Pending"
                          ? "yellow"
                          : book.status === "Reject"
                          ? "red"
                          : book.status === "Approved"
                          ? "blue"
                          : "transparent",
                      color:
                        book.status === "Pending" || book.status === "Reject"
                          ? "black"
                          : "white",
                    }}
                  >
                    {book.status}
                  </td>
                  <td>{book.requestDate}</td>
                  <td>
                    <div className="d-grid gap-2 justify-content-md">
                      <PrimaryButton
                        onClick={() =>
                          navigate(`/bookapproval/${book.processId}`)
                        }
                        buttonName={"View"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BookRequestTable2;
