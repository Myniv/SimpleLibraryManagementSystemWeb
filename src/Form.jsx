/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { bookList } from "./Books";
const AddBookForm = ({
  book,
  setBook,
  isEditing,
  setIsEditing,
  selectedBook,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    publicationyear: "",
    isbn: "",
  });

  useEffect(() => {
    if (isEditing && selectedBook) {
      setFormData(selectedBook);
    }
  }, [isEditing, selectedBook]);

  //setError Validation
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    const currentYear = new Date().getFullYear();
    if (
      !formData.publicationyear ||
      formData.publicationyear.length < 1800 ||
      formData.publicationyear.length > currentYear
    ) {
      newErrors.publicationyear =
        "Publication Year must be between in year 1800 and year " + currentYear;
    }

    const isValidISBN = /^(978|979)\d{10}$/;
    if (!formData.isbn || (formData.isbn && !isValidISBN.test(formData.isbn))) {
      newErrors.isbn =
        "The first 3 digit ISBN must be 978 or 979 and have a total of 13 digit.";
    }

    return newErrors;
  };

  //To change when user type in
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectBook = bookList.find(
        (bookList) => bookList.category === value
      );
      if (selectBook) {
        setFormData((prevData) => ({
          ...prevData,
          category: selectBook.category,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...formData,
        [name]: value,
      }));
    }
  };

  const onUpdateBook = () => {
    //loop through map to check if book.id === formData.id
    const editingBooks = book.map((book) => {
      if (book.id === formData.id) {
        return {
          //if True, set title: formData.title and etc
          ...book,
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

    alert("The Book has been Editted!!");
  };

  const onAddBook = () => {
    //Add new book
    const newBookId = { ...formData, id: book.length + 1 };
    setBook([...book, newBookId]);
    alert("The new book has been Submitted!!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      if (isEditing) {
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
      });

      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  //For make unik array (Remove Duplicate)
  const unikCategorys = Array.from(
    new Set(bookList.map((bookList) => bookList.category))
  );

  const bookIdComponent = book.length + 1;

  const addOrEditTite = React.useRef("Add Book");
  const changeTitle = () => {
    if (isEditing) {
      addOrEditTite.current = "Edit Book";
    }
  };

  return (
    <>
      <br></br>
      <br></br>
      <h2>{changeTitle()}</h2>
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
            className="btn btn-primary mb-3 right text-right"
          >
            {isEditing ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </>
  );
};

export { AddBookForm };
