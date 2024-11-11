import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import LoadingAddEdit from "../../Component/Elements/LoadingAddEdit";
import axios from "axios";

const ReturnsForms = () => {
  const { transactions } = useOutletContext();
  const [onSubmit, setOnSubmit] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    transactionid: "",
    userid: "",
    bookid: "",
    borrowdate: "",
    borrowexpired: "",
    isreturned: false,
    returndate: "",
  });

  const focusTransactionIdInput = useRef(null);

  useEffect(() => {
    if (params.id) {
      const findTransaction = transactions.find(
        (transaction) => transaction.transactionid === Number(params.id)
      );
      if (findTransaction) {
        setFormData(findTransaction);
      }
    }

    if (focusTransactionIdInput.current) {
      focusTransactionIdInput.current.focus();
    }
  }, [params, transactions]);

  useEffect(() => {
    if (onSubmit) {
      if (params.id) {
        onUpdateTransaction();
      } else {
        onAddTransaction();
      }
      setOnSubmit(false);
    }
  }, [onSubmit]);

  const onAddTransaction = () => {
    axios
      .post("http://localhost:5265/api/Transactions/borrow", formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "Borrowing book...",
          nextPage: () => navigate("/transactions"),
        });
      })
      .catch((err) => console.log(err));
  };

  const onUpdateTransaction = () => {
    axios
      .put(`http://localhost:5265/api/Transactions/return`, formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "Returning book...",
          nextPage: () => navigate("/transactions"),
        });
      })
      .catch((err) => console.log(err));
  };

  const onCancel = () => {
    setFormData({
      transactionid: "",
      userid: "",
      bookid: "",
      borrowdate: "",
      borrowexpired: "",
      isreturned: false,
      returndate: "",
    });
    navigate("/transactions");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.userid) {
      newErrors.userid = "User ID is required.";
    }
    if (!formData.bookid) {
      newErrors.bookid = "Book ID is required.";
    }
    if (!formData.borrowdate) {
      newErrors.borrowdate = "Borrow date is required.";
    }
    if (!formData.borrowexpired) {
      newErrors.borrowexpired = "Expiration date is required.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setOnSubmit(true);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const transactionId = transactions.length > 0 ? transactions[transactions.length - 1].transactionid + 1 : 1;

  return (
    <>
      <div className="mb-5">
        <h2 className="ms-5">
          {params.id
            ? `Form Return Book with id ${params.id}`
            : "Form Borrow Book"}
        </h2>
        <div className="container border">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="transactionid" className="form-label">
                Transaction ID
              </label>
              <input
                type="number"
                className="form-control"
                id="transactionid"
                name="transactionid"
                value={formData.transactionid}
                placeholder={transactionId}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userid" className="form-label">
                User ID
              </label>
              <input
                type="number"
                id="userid"
                name="userid"
                className={`form-control ${errors.userid ? "is-invalid" : ""}`}
                value={formData.userid}
                onChange={handleChange}
                required
                placeholder="User ID"
              />
              {errors.userid && (
                <div className="invalid-feedback">{errors.userid}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="bookid" className="form-label">
                Book ID
              </label>
              <input
                type="number"
                id="bookid"
                name="bookid"
                className={`form-control ${errors.bookid ? "is-invalid" : ""}`}
                value={formData.bookid}
                onChange={handleChange}
                required
                placeholder="Book ID"
              />
              {errors.bookid && (
                <div className="invalid-feedback">{errors.bookid}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="borrowdate" className="form-label">
                Borrow Date
              </label>
              <input
                type="date"
                id="borrowdate"
                name="borrowdate"
                className={`form-control ${errors.borrowdate ? "is-invalid" : ""}`}
                value={formData.borrowdate}
                onChange={handleChange}
                required
              />
              {errors.borrowdate && (
                <div className="invalid-feedback">{errors.borrowdate}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="borrowexpired" className="form-label">
                Expiration Date
              </label>
              <input
                type="date"
                id="borrowexpired"
                name="borrowexpired"
                className={`form-control ${errors.borrowexpired ? "is-invalid" : ""}`}
                value={formData.borrowexpired}
                onChange={handleChange}
                required
              />
              {errors.borrowexpired && (
                <div className="invalid-feedback">{errors.borrowexpired}</div>
              )}
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="isreturned"
                name="isreturned"
                className="form-check-input"
                checked={formData.isreturned}
                onChange={handleChange}
              />
              <label htmlFor="isreturned" className="form-check-label">
                Is Returned
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="returndate" className="form-label">
                Return Date
              </label>
              <input
                type="date"
                id="returndate"
                name="returndate"
                className="form-control"
                value={formData.returndate}
                onChange={handleChange}
                disabled={!formData.isreturned}
              />
            </div>
            <button type="submit" className="btn btn-primary m-1">
              {params.id ? "Return Book" : "Borrow Book"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-danger m-1"
            >
              {params.id ? "Cancel Return" : "Cancel Borrow"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReturnsForms;
