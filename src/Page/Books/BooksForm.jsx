/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import LoadingAddEdit from "../../Component/Elements/LoadingAddEdit";
import axios from "axios";
import DangerButton from "../../Component/Elements/DangerButton";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
const AddBookForm = () => {
  const { book } = useOutletContext();
  const navigate = useNavigate();

  const [onSubmit, setOnSubmit] = useState(false);

  const params = useParams();

  const [formData, setFormData] = useState({
    bookid: "",
    title: "",
    author: "",
    publicationyear: "",
    isbn: "",
  });

  //To change title end button text
  const addOrEditTitle = useRef("Form Add Book");
  const addOrEditButton = useRef("Add Book");

  //To focus on input Title if edit or add
  const focusTitleInput = useRef(null);

  useEffect(() => {
    if (params.id) {
      const findBook = book.find((book) => book.bookid === Number(params.id));
      if (findBook) {
        setFormData(findBook);
        addOrEditTitle.current = `Form Edit book with id: ${params.id}`;
        addOrEditButton.current = "Edit Book";
      }
    }

    if (focusTitleInput.current) {
      focusTitleInput.current.focus();
    }
  }, [book, params]);

  useEffect(() => {
    if (onSubmit) {
      if (params.id) {
        onUpdateBook();
      } else {
        onAddBook();
      }
      setOnSubmit(false);
    }
  }, [onSubmit]);

  //setError Validation
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    const currentYear = new Date().getFullYear();
    //ParseInt is for parsing the formData.publicationyear (from string or date or ect) to Int
    const pubYear = parseInt(formData.publicationyear, 10);
    if (!pubYear || pubYear < 1900 || pubYear >= currentYear + 1) {
      newErrors.publicationyear =
        "Publication Year must be between in year 1900 and year " + currentYear;
    }

    if (!formData.title || formData.title.length < 3) {
      newErrors.title = "Title must be more than 2 characters!!";
    }

    const isValidISBN = /^(978|979)\d{10}$/;
    if (!formData.isbn || (formData.isbn && !isValidISBN.test(formData.isbn))) {
      newErrors.isbn =
        "The first 3 digit ISBN must be 978 or 979 and have a total of 13 digit.";
    } else if (
      //.some is for searching array data that at least have one that same as the condition and return boolean
      //if form adding based isEditing false
      book.some((b) => b.isbn === formData.isbn && !params.id) ||
      //if form editing based isEditing true and if the isbn is the same like the other id except itself
      book.some(
        (b) =>
          b.isbn === formData.isbn && params.id && b.bookid !== formData.bookid
      )
    ) {
      newErrors.isbn =
        "ISBN must be unique and cant be the same like the other!!";
    }

    return newErrors;
  };

  const onAddBook = () => {
    axios
      .post("http://localhost:5265/api/Books", formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "The new book is being added...",
          nextPage: () => navigate("/books"),
        });
      })
      .catch((err) => console.log(err));
  };

  const onUpdateBook = () => {
    axios
      .put(`http://localhost:5265/api/Books/${formData.bookid}`, formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "The book is being edited...",
          nextPage: () => navigate("/books"),
        });
      })
      .catch((err) => console.log(err));
  };

  const onCancel = () => {
    setFormData({
      bookid: "",
      title: "",
      author: "",
      publicationyear: "",
      isbn: "",
    });
    navigate("/books");
  };

  //To change when user type in
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(() => ({
      ...formData,
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

  const bookIdComponent =
    book.length > 0 ? book[book.length - 1].bookid + 1 : 1;

  return (
    <>
      <div className="mb-5">
        <h2 className="ms-5">{addOrEditTitle.current}</h2>
        <div className="container border">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="bookid" className="form-label">
                    ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="bookid"
                    name="bookid"
                    value={formData.bookid}
                    placeholder={bookIdComponent}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    ref={focusTitleInput}
                    required
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                  {/* If name error, show <div> */}
                  {/* This is the same as the rest*/}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="isbn" className="form-label">
                    ISBN
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.isbn ? "is-invalid" : ""
                    }`}
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="ISBN"
                    required
                  />
                  {errors.isbn && (
                    <div className="invalid-feedback">{errors.isbn}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    Author
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="publicationyear" className="form-label">
                    Publication Year
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.publicationyear ? "is-invalid" : ""
                    }`}
                    id="publicationyear"
                    name="publicationyear"
                    value={formData.publicationyear}
                    onChange={handleChange}
                    placeholder="Publication Year"
                    required
                  />
                  {errors.publicationyear && (
                    <div className="invalid-feedback">
                      {errors.publicationyear}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary m-3 right text-right"
            >
              {addOrEditButton.current}
            </button>

            <DangerButton
              onClick={onCancel}
              buttonName={`Cancel ${addOrEditButton.current}`}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export { AddBookForm };
