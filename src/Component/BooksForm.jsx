/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { bookList } from "./Books";
const AddBookForm = ({
  isEditing,
  setIsEditing,
  selectedBook,
  book,
  setBook,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    publicationyear: "",
    isbn: "",
  });

  //To change title end button text
  const addOrEditTitle = useRef("Form Add Book");
  const addOrEditButton = useRef("Add Book");

  //To focus on input Title if edit or add
  const focusTitleInput = useRef(null);

  useEffect(() => {
    if (isEditing && selectedBook) {
      setFormData(selectedBook);
      addOrEditTitle.current = "Form Edit Book";
      addOrEditButton.current = "Edit Book";
      // console.log(isEditing);
    }

    if (focusTitleInput.current) {
      focusTitleInput.current.focus();
    }
  }, [isEditing, selectedBook]);

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
    localStorage.setItem("book", JSON.stringify(newBook));

    alert("The new book has been Submitted!!");
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
        };
      } else {
        return book;
      }
    });

    setBook(editingBooks);

    localStorage.setItem("book", JSON.stringify(editingBooks));

    alert("The Book has been Editted!!");
  };

  const onCancelEdit = () => {
    setFormData({
      id: "",
      title: "",
      author: "",
      category: "",
      publicationyear: "",
      isbn: "",
    });

    setIsEditing(false);
    addOrEditTitle.current = "Form Add Book";
    addOrEditButton.current = "Add Book";
  };

  const onEndEdit = () => {
    addOrEditTitle.current = "Form Add Book";
    addOrEditButton.current = "Add Book";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      if (isEditing === true) {
        onUpdateBook();
        setIsEditing(false);
        onEndEdit();
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
      });

      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  //To change when user type in
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  //For make unik array (Remove Duplicate)
  const unikCategorys = Array.from(
    new Set(bookList.map((bookList) => bookList.category))
  );

  // const bookIdComponent = book.length > 0 ? book[book.length - 1].id + 1 : 1;

  return (
    <>
      <br></br>
      <br></br>
      <h2>{addOrEditTitle.current}</h2>
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
                  // placeholder={bookIdComponent}
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
                  {unikCategorys.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
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
                  className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
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
          </div>
          <button
            type="submit"
            className="btn btn-primary m-3 right text-right"
          >
            {addOrEditButton.current}
          </button>
          {isEditing === true && (
            <button
              type="submit"
              onClick={onCancelEdit}
              className="btn btn-danger right text-right"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export { AddBookForm };
