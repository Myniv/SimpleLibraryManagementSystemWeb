/* eslint-disable react/prop-types */
import { useState } from "react";
import { bookList } from "./Books";
const AddBookForm = ({book, setBook}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    publicationyear: "",
    isbn: "",
  });

  // const [book, setBook] = useState(bookList);

  //To change when user type in
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectedBook = bookList.find(
        (bookList) => bookList.category === value
      );
      if (selectedBook) {
        setFormData((prevData) => ({
          ...prevData,
          category: selectedBook.category,

        }));
      }
    } else {
      setFormData((prevData) => ({
        ...formData,
        [name]: value,
      }));
    }
  };

  const bookId = book.length+1;
  const handleSubmit = (e) => {
    //prevent default is for not completely submitting and not refresh page
    //so the logic can be added below it if want to sending data withot refresh the page
    e.preventDefault();
    
    const newBookId = {...formData, id: book.length +1};
    setBook([...book, newBookId]);

    // Alert message
    alert("The new book has been submitted!!");

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
                  placeholder={bookId}
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
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export { AddBookForm };
