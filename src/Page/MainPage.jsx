import { useEffect, useState } from "react";
import MemberService from "../service/member/MemberService";
import BookService from "../service/book/BookService";
import PieChartCodes from "../Component/Widgets/PieChartCodes";

const MainPage = () => {
  const [member, setMember] = useState([]);
  const [book, setBook] = useState([]);
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    MemberService.getAllUser()
      .then((res) => {
        const sortedMembers = res.data.sort((a, b) => a.userid - b.userid);
        setMember(sortedMembers);
      })
      .catch((err) => {
        console.log(err);
      });

    BookService.getAll()
      .then((res) => {
        const sortedBooks = res.data.sort((a, b) => a.bookid - b.bookid);
        setBook(sortedBooks);
      })
      .catch((err) => {
        console.log(err);
      });

    BookService.getDashboardList()
      .then((res) => {
        // const sortedBooks = res.data.sort((a, b) => a.bookid - b.bookid);
        setDashboard(res.data);
        // console.log("Updated dashboard:", dashboard);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container text-center my-4">
      <h2>Welcome to Library Management</h2>
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
              Total Overdue Books
            </h5>
            <p
              className="card-text"
              style={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              {dashboard?.overdueBooks?.length}
            </p>
          </div>
        </div>
        <div className="card text-center m-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title bg-dark text-white p-2 rounded">
              Process To Follow Up
            </h5>
            <p
              className="card-text"
              style={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              {dashboard?.processToFollowUp || 0}
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
      <PieChartCodes data={dashboard.booksPerCategory} />
    </div>
  );
};
export default MainPage;
