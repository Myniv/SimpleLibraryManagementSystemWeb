/* eslint-disable react/prop-types */
const BookOverdueTable = ({ data }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Member</th>
          <th scope="col">Days Overdue</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((book, index) => (
          <tr scope="row" key={index}>
            <td>{book.title}</td>
            <td>{book.username}</td>
            <td>{book.overdueDays}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookOverdueTable;
