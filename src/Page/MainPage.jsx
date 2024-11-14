import axios from "axios";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [member, setMember] = useState([]);
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5265/api/Users")
      .then((res) => {
        const sortedMembers = res.data.sort((a, b) => a.userid - b.userid);
        setMember(sortedMembers);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5265/api/Books")
      .then((res) => {
        const sortedBooks = res.data.sort((a, b) => a.bookid - b.bookid);
        setBook(sortedBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container text-center my-4">
      <h2>Library Dashboard</h2>
      <div className="container d-flex justify-content-center">
        <div className="card text-center m-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title bg-dark text-white p-2 rounded">
              Total Books
            </h5>
            <p
              className="card-text"
              style={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              {book.length}
            </p>
          </div>
        </div>

        <div className="card text-center m-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title bg-dark text-white p-2 rounded">
              Total Members
            </h5>
            <p
              className="card-text"
              style={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              {member.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
