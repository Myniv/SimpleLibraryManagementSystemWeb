import { useState } from "react";
import BookService from "../../service/book/BookService";
import LoadingAddEdit from "../../Component/Elements/LoadingAddEdit";
import { useNavigate } from "react-router-dom";
import DangerButton from "../../Component/Elements/DangerButton";

const BookRequestForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    isbn: "978-0987654321",
    author: "",
    publisher: "",
    startDate: "",
    endDate: "2055-03-04",
    locationId: 2,
  });

  const onRequestBook = () => {
    BookService.bookRequest(formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "The book is being requested...",
          nextPage: () => navigate("/profile"),
        });
      })
      .catch((error) => console.log(error));
  };

  const onReset = () => {
    setFormData({
      title: "",
      isbn: "978-0987654321",
      author: "",
      publisher: "",
      startDate: "",
      endDate: "2028-03-04",
      locationId: 2,
    });
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.title ||
      formData.title.length < 2 ||
      formData.title.length > 100
    ) {
      newErrors.title = "Title must be between 2 and 100 characters";
    }
    if (
      !formData.author ||
      formData.author.length < 2 ||
      formData.author.length > 100
    ) {
      newErrors.author = "Author must be between 2 and 100 characters";
    }
    if (
      !formData.publisher ||
      formData.publisher.length < 2 ||
      formData.publisher.length > 100
    ) {
      newErrors.publisher = "Publisher must be between 2 and 100 characters";
    }

    return newErrors;
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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("FormData being sent:", formData);
      onRequestBook();
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="mb-5">
        <h2 className="ms-5">Request Book</h2>
        <div className="container border">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Title"
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className={`form-control ${errors.author ? "is-invalid" : ""}`}
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Author"
              />
              {errors.author && (
                <div className="invalid-feedback">{errors.author}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="publisher" className="form-label">
                Publisher
              </label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                className={`form-control ${
                  errors.publisher ? "is-invalid" : ""
                }`}
                value={formData.publisher}
                onChange={handleChange}
                required
                placeholder="Publisher"
              />
              {errors.publisher && (
                <div className="invalid-feedback">{errors.publisher}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Publish Year
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className={`form-control ${
                  errors.startDate ? "is-invalid" : ""
                }`}
                value={formData.startDate}
                onChange={handleChange}
                required
                placeholder="Publisher"
              />
              {errors.startDate && (
                <div className="invalid-feedback">{errors.startDate}</div>
              )}
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

export default BookRequestForm;
