import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookService from "../../service/book/BookService";
import { Button } from "react-bootstrap";

const DetailBooks = () => {
  const [books, setBooks] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);

  useEffect(() => {
    if (params) {
      BookService.getId(params.id).then((res) => {
        const booksDetail = res.data;
        setBooks(booksDetail);
      });
    }
  }, [params, books]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#f8f9fa", // Optional background color
        padding: "20px", // Extra padding for smaller screens
      }}
    >
      <div
        className="col-md-6"
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "#fff", // Optional background for the card
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)", // Optional shadow for aesthetics
          position: "relative", // For positioning the back button
        }}
      >
        {/* Back Button */}
        <Button
          variant="light"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => navigate("/searchbooks")}
        >
          <span
            style={{
              fontSize: "1.2rem",
              marginRight: "5px",
            }}
          >
            ←
          </span>
          Back
        </Button>

        <h4 className="m-2 text-center">{books.title}</h4>
        <img
          className="img-fluid mx-auto d-block"
          src="/img/bookIcon.png"
          alt="Book"
          style={{
            height: "200px",
            objectFit: "contain",
            backgroundColor: "#E8E8E8",
          }}
        />
        <p className="m-2 text-center">
          <strong>Book ID: </strong> {` ${books.bookId}`}
        </p>

        <p className="m-2 text-center">
          <strong>Author: </strong>
          {books ? `${books.author}` : "null"}
        </p>
        <p className="m-2 text-center">
          <strong>Publisher: </strong>
          {books.publisher}
        </p>
        <p className="m-2 text-center">
          <strong>ISBN: </strong>
          {books.isbn}
        </p>
        <p className="m-2 text-center">
          <strong>Description: </strong>
          {books.description}
        </p>
        <p className="m-2 text-center">
          <strong>Location : </strong>
          {books.location ? books.location : "Gramedia"}
        </p>
      </div>
    </div>
  );
};

export default DetailBooks;
