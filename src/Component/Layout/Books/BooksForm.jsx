/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ShowLoading from "../../Elements/ShowLoading";
const AddBookForm = () => {
  const { book, setBook, isEditing, setIsEditing, selectedBook } =
    useOutletContext();
  const navigate = useNavigate();

  //the other way to get id beside using useState selected book is using param
  //ex {params.id}
  const params = useParams();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    publicationyear: "",
    isbn: "",
    availability: "",
  });

  //To change title end button text
  const addOrEditTitle = useRef("Form Add Book");
  const addOrEditButton = useRef("Add Book");

  //To focus on input Title if edit or add
  const focusTitleInput = useRef(null);

  useEffect(() => {
    if (isEditing && selectedBook) {
      setFormData(selectedBook);
      //the example using params
      addOrEditTitle.current = `Form Edit book with id: ${params.id}`;
      addOrEditButton.current = "Edit Book";
      // console.log(isEditing);
    }

    if (focusTitleInput.current) {
      focusTitleInput.current.focus();
    }
  }, [isEditing, selectedBook, params]);

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

    const isValidISBN = /^(978|979)\d{10}$/;
    if (!formData.isbn || (formData.isbn && !isValidISBN.test(formData.isbn))) {
      newErrors.isbn =
        "The first 3 digit ISBN must be 978 or 979 and have a total of 13 digit.";
    } else if (
      //.some is for searching array data that at least have one that same as the condition and return boolean
      //if form adding based isEditing false
      book.some((b) => b.isbn === formData.isbn && !isEditing) ||
      //if form editing based isEditing true and if the isbn is the same like the other id except itself
      book.some(
        (b) => b.isbn === formData.isbn && isEditing && b.id !== formData.id
      )
    ) {
      newErrors.isbn =
        "ISBN must be unique and cant be the same like the other!!";
    }

    return newErrors;
  };

  const onAddBook = () => {
    //Add new book
    const newBookId = {
      ...formData,
      id: book.length > 0 ? book[book.length - 1].id + 1 : 1,
    };
    const newBook = [...book, newBookId];
    setBook(newBook);

    //add to local storage with newbook
    localStorage.setItem("book", JSON.stringify(newBook));

    //Add loading
    ShowLoading({
      loadingMessage: "Adding data Members...",
      nextPage: () => navigate("/books"),
    });
  };

  const onUpdateBook = () => {
    //loop through map to check if book.id === formData.id
    const editingBooks = book.map((book) => {
      if (book.id === formData.id) {
        return {
          //if True, set title: formData.title and etc
          ...book,
          id: formData.id,
          title: formData.title,
          author: formData.author,
          category: formData.category,
          publicationyear: formData.publicationyear,
          isbn: formData.isbn,
          availability: formData.availability,
        };
      } else {
        return book;
      }
    });

    setBook(editingBooks);

    //change data in local storage based on id
    localStorage.setItem("book", JSON.stringify(editingBooks));

    ShowLoading({
      loadingMessage: `Updating book with id: ${params.id}...`,
      nextPage: () => navigate("/books"),
    });
  };

  const onCancel = () => {
    setFormData({
      id: "",
      title: "",
      author: "",
      category: "",
      publicationyear: "",
      isbn: "",
      availability: "",
    });

    setIsEditing(false);

    //move to books when cancel
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
      if (isEditing === true) {
        onUpdateBook();
        setIsEditing(false);
      } else {
        onAddBook();
      }
      //Reset all form
      setFormData({
        id: "",
        title: "",
        author: "",
        category: "",
        publicationyear: "",
        isbn: "",
        availability: "",
      });

      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  //For make unik array (Remove Duplicate)
  // const unikCategorys = Array.from(
  //   new Set(book.map((bookList) => bookList.category))
  // );

  const bookIdComponent = book.length > 0 ? book[book.length - 1].id + 1 : 1;

  return (
    <>
      <div className="mb-5">
        <h2 className="ms-5">{addOrEditTitle.current}</h2>
        <div className="container border">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="id" className="form-label">
                    ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="id"
                    name="id"
                    value={formData.id}
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
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    ref={focusTitleInput}
                    required
                  />
                  {/* If name error, show <div> */}
                  {/* This is the same as the rest*/}
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Shonen">Shonen</option>
                    <option value="Sheinen">Sheinen</option>
                    {/* {unikCategorys.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))} */}
                  </select>
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

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    id="availability"
                    name="availability"
                    className="form-check-input"
                    checked={formData.availability}
                    onChange={handleChange}
                  />
                  <label htmlFor="availability" className="form-check-label">
                    Availability
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary m-3 right text-right"
            >
              {addOrEditButton.current}
            </button>
            <button
              type="submit"
              onClick={onCancel}
              className="btn btn-danger right text-right"
            >
              Cancel {addOrEditButton.current}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { AddBookForm };
