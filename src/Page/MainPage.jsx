import { useEffect, useState } from "react";
import MemberService from "../service/member/MemberService";
import BookService from "../service/book/BookService";
import PieChartCodes from "../Component/Widgets/PieChartCodes";
import BarChartCodes from "../Component/Widgets/BarChartCodes";
import LineChartCodes from "../Component/Widgets/LineChartCodes";
import AreaChartCodes from "../Component/Widgets/AreaChartCodes";
import BookRequestTable2 from "./Books/BookRequestTable2";
import BookOverdueTable from "./Books/BookOverdueTable";

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
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card text-center" style={{ width: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title bg-dark text-white p-2 rounded">
                  Total Books
                </h5>
                <p
                  className="card-text"
                  style={{ fontSize: "2rem", fontWeight: "bold" }}
                >
                  {book?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card text-center" style={{ width: "25rem" }}>
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
          </div>
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title bg-dark text-white p-2 rounded">
                  Total Members
                </h5>
                <p
                  className="card-text"
                  style={{ fontSize: "2rem", fontWeight: "bold" }}
                >
                  {member?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="col-4">
            <div className="card text-center mt-3">
              <div className="card-body">
                <h5 className="card-title bg-dark text-white p-2 rounded">
                  Bar Chart
                </h5>

                <BarChartCodes
                  data={dashboard.mostActiveUsers}
                  name="name"
                  value="totalTransaction"
                />
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="card text-center mt-3">
              <div className="card-body">
                <h5 className="card-title bg-dark text-white p-2 rounded">
                  Pie Charts
                </h5>
                <PieChartCodes
                  data={dashboard.booksPerCategory}
                  name="category"
                  value="count"
                />
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="card text-center mt-3">
              <div className="card-body">
                <h5 className="card-title bg-dark text-white p-2 rounded">
                  Total Overdue Books
                </h5>
                {/* <p
                  className="card-text"
                  style={{ fontSize: "2rem", fontWeight: "bold" }}
                >
                  {dashboard?.overdueBooks?.length || 0}
                </p> */}
                <BookOverdueTable data={dashboard.overdueBooks} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card text-center mt-3">
              <div className="card-body">
                <h5 className="card-title bg-dark text-white p-2 rounded">
                  Line Charts
                </h5>
                <LineChartCodes />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card text-center mt-3">
              <div className="card-body">
                <h5 className="card-title bg-dark text-white p-2 rounded">
                  Area Charts
                </h5>
                <AreaChartCodes />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card text-center mt-3">
              <div className="card-body">
                <h5 className="card-title bg-dark text-white p-2 rounded">
                  Follow Up Task
                </h5>
                <BookRequestTable2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
