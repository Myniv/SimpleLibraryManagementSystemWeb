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
    console.log(`Form Submitted`);
  };

  //For make unik array (Remove Duplicate)
  const unikCategorys = Array.from(
    new Set(bookList.map((bookList) => bookList.category))
  );
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID</label>
        <input type="number" id="id" name="id" value={formData.id} required />

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          {unikCategorys.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          {/* <option value={""} selected>
            Category
          </option> */}
        </select>

        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          required
        />

        <label htmlFor="publicationyear">Publication Year</label>
        <input
          type="date"
          id="publicationyear"
          name="publicationyear"
          value={formData.publicationyear}
          required
        />

        <label htmlFor="isbn">ISBN</label>
        <input
          type="number"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          required
        />
      </div>
    </form>
  );
};

export { AddBookForm };
