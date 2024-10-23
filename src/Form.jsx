import { useState } from "react";
import { bookList } from "./Books";
const AddBookForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    publicationyear: "",
    isbn: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectedBook = bookList.find(
        (bookList) => bookList.category === value
      );
      if (selectedBook) {
        setFormData({
          //   id: selectedBook.id,
          //   title: selectedBook.title,
          //   author: selectedBook.author,
          category: selectedBook.category,
          //   publicationyear: selectedBook.publicationyear,
          //   isbn: selectedBook.isbn,
        });
      }
    } else {
      setFormData({
        ...FormData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    //prevent default is for not completely submitting
    e.preventDefault();

    // Alert message if form is filled correctly
    alert("The new book has been submitted!!");
    setFormData({
      id: "",
      title: "",
      category: "",
      author: "",
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
      <div className="container border border-dark">
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
              placeholder="ID"
              required
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
              value={formData.publicationyearr}
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
          {/* <div class="d-flex justify-content-end"> */}

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary m-3 right text-right"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export { AddBookForm };
