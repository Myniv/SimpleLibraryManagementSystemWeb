import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookService from "../../service/book/BookService";
import LoadingAddEdit from "../../Component/Elements/LoadingAddEdit";
import DangerButton from "../../Component/Elements/DangerButton";

const BooksApproval = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookRequestId: 0,
    approval: "",
  });

  const onApproveBook = () => {
    BookService.bookApproval(formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "The book is being approved...",
          nextPage: () => navigate("/profile"),
        });
      })
      .catch((error) => console.log(error));
  };

  const onReset = () => {
    setFormData({
      bookRequestId: 0,
      approval: "",
    });
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
      <div className="mb-5">
        <h2 className="ms-5">Approve Book</h2>
        <div className="container border">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="bookRequestId" className="form-label">
                Book Request ID
              </label>
              <input
                type="number"
                id="bookRequestId"
                name="bookRequestId"
                className={`form-control`}
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Book Request ID"
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
                <label htmlFor="Approved" className="form-check-label ms-2">
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
                <label htmlFor="Reject" className="form-check-label ms-2">
                  Reject
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary m-3 btn-sm">
              Submit
            </button>
            <DangerButton onClick={onReset} buttonName={`Reset`} />
          </form>
        </div>
      </div>
    </>
  );
};

export default BooksApproval;
