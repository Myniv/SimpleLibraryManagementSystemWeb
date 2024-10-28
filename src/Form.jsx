/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { bookList } from "./Books";
const AddBookForm = ({ book, setBook, isEditing, setIsEditing, selectedBook }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    publicationyear: "",
    isbn: "",
  });

  useEffect(() => {
    console.log("useEffect triggered", { isEditing, selectedBook });
    if(isEditing && selectedBook){
      setFormData(selectedBook);
    }
  }, [isEditing, selectedBook])

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

  const bookIdComponent = book.length + 1;
  const handleSubmit = (e) => {
    e.preventDefault();

    if(isEditing){
      onUpdateBook();
      setIsEditing(false);
    } else{
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
  };

  //For make unik array (Remove Duplicate)
  const unikCategorys = Array.from(
    new Set(bookList.map((bookList) => bookList.category))
  );

  return (
    <>
      <br></br>
      <br></br>
      <h2>Form Book Input</h2>
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
                  type="date"
                  className="form-control"
                  id="publicationyear"
                  name="publicationyear"
                  value={formData.publicationyear}
                  onChange={handleChange}
                  placeholder="Publication Year"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="isbn" className="form-label">
                  ISBN
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  placeholder="ISBN"
                  required
                />
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
