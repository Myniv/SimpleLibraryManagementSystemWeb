import { useEffect, useState } from "react";
import Pagination from "../../Component/Widgets/Pagination";

/* eslint-disable react/prop-types */
const BookOverdueTable = ({ data }) => {
  const [overdueData, setOverdueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (data) {
      setOverdueData(data);
    }
  }, [data]);

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = overdueData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(overdueData.length / itemsPerPage);

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Member</th>
            <th scope="col">Days Overdue</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBooks?.map((book, index) => (
            <tr scope="row" key={index}>
              <td>{book.title}</td>
              <td>{book.username}</td>
              <td>{book.overdueDays}</td>
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
    </>
  );
};

export default BookOverdueTable;
