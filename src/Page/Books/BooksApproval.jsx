import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookService from "../../service/book/BookService";
import LoadingAddEdit from "../../Component/Elements/LoadingAddEdit";
import LoadingState from "../../Component/Elements/LoadingState";
import ErrorMessage from "../../Component/Elements/ErrorMessage";

const BooksApproval = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookRequestId: 0,
    approval: "",
    notes: "",
  });

  const [bookReqAppr, setBookReqAppr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bookRequestId: params.id,
      }));

      setIsLoading(true);
      BookService.getBookRequestId(params.id)
        .then((res) => {
          setBookReqAppr(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsError(err.message);
          console.log(err);
        });
    }
  }, [params.id]);

  console.log(bookReqAppr);

  const onApproveBook = () => {
    BookService.bookApproval(formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "The book is being approved...",
          nextPage: () => navigate("/bookrequesttable"),
        });
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApproveBook();
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorMessage errorMessage="Error" />
      ) : (
        <div className="mb-5">
          <h2 className="ms-5">Approve Book</h2>
          <div className="container border">
            <div className="container">
              <div className="container mt-4">
                <div className="card">
                  <div className="card-body">
                    {/* Requester and Status */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <p>
                          <strong>Requester:</strong>{" "}
                          {bookReqAppr.data.requesterName}
                        </p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <p>
                          <strong>Current Status:</strong>{" "}
                          <span className="badge bg-secondary">
                            {bookReqAppr.data.status}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Request Date */}
                    <p>
                      <strong>Request Date:</strong>{" "}
                      {bookReqAppr.data.requestDate}
                    </p>

                    {/* Book Details */}
                    <h5 className="mt-4">Book Detail</h5>
                    <ul className="list-unstyled">
                      <li>
                        <strong>Title:</strong> {bookReqAppr.data.title}
                      </li>
                      <li>
                        <strong>Author:</strong> {bookReqAppr.data.author}
                      </li>
                      <li>
                        <strong>Publish Year:</strong>
                        {bookReqAppr.data.publishYear}
                      </li>
                    </ul>

                    {/* Request History */}
                    <h5 className="mt-4">Request History</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Review Date</th>
                            <th>Action by</th>
                            <th>Action</th>
                            <th>Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookReqAppr.data.requestHistory?.map(
                            (history, index) => (
                              <tr key={index}>
                                <td>{history.actionDate}</td>
                                <td>{history.actorName}</td>
                                <td>
                                  {history.action ? history.action : "N/A"}
                                </td>
                                <td>
                                  {history.comments ? history.comments : "N/A"}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                    {bookReqAppr.status === "Approved" ||
                    bookReqAppr.status === "Rejected" ? (
                      ""
                    ) : (
                      <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mb-3">
                          <label
                            htmlFor="bookRequestId"
                            className="form-label"
                            hidden
                          >
                            Book Request ID
                          </label>
                          <input
                            type="number"
                            id="bookRequestId"
                            name="bookRequestId"
                            className={`form-control`}
                            value={formData.bookRequestId}
                            onChange={handleChange}
                            required
                            placeholder={params.id}
                            disabled
                            hidden
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <div className="mt">
                            <input
                              type="radio"
                              id="Approved"
                              name="approval"
                              className={`form-check-input`}
                              value="Approved"
                              onChange={handleChange}
                              checked={formData.approval === "Approved"}
                            />
                            <label
                              htmlFor="Approved"
                              className="form-check-label ms-2"
                            >
                              Approve
                            </label>

                            <input
                              type="radio"
                              id="Reject"
                              name="approval"
                              className={`form-check-input ms-2`}
                              value="Reject"
                              onChange={handleChange}
                              checked={formData.approval === "Reject"}
                            />
                            <label
                              htmlFor="Reject"
                              className="form-check-label ms-2"
                            >
                              Reject
                            </label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="bookRequestId" className="form-label">
                            Comment
                          </label>
                          <input
                            type="text"
                            id="notes"
                            name="notes"
                            className={`form-control`}
                            value={formData.notes}
                            onChange={handleChange}
                            required
                            placeholder="Comment"
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary m-3 btn-sm"
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BooksApproval;
