import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmations";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import Loading from "../../Component/Elements/Loading";
import Pagination from "../../Component/Widgets/Pagination";

const MemberTable = () => {
  const { member, setMember } = useOutletContext();
  const [deleteMember, setDeleteMember] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5265/api/Users")
      .then((res) => {
        const sortedMembers = res.data.sort((a, b) => a.userid - b.userid);
        setMember(sortedMembers);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [setMember]);

  useEffect(() => {
    if (deleteMember) {
      const deleteMember = () => {
        setLoading(true);
        axios
          .delete(`http://localhost:5265/api/Users/${deleteMemberId}`)
          .then((res) => {
            const sortedMembers = res.data.sort((a, b) => a.userid - b.userid);
            setMember(sortedMembers);
            setDeleteMember(false);
            setLoading(false);
          })
          .catch((err) => {
            setDeleteMember(false);
            setLoading(false);
            console.log(err);
          });
      };
      DeleteConfirmation({ deleteData: () => deleteMember() });
    }
  }, [deleteMember]);

  const onEditingMember = (id) => {
    navigate(`/members/${id}`);
  };

  const onAddMember = () => {
    navigate("/members/add");
  };

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = member.slice(startIndex, startIndex + itemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(member.length / itemsPerPage);

  // Handle pagination navigation
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Member Table</h2>
          </div>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member) => (
                <tr scope="row" key={member.userid}>
                  <td>{member.userid}</td>
                  <td>{member.username}</td>
                  <td>{member.phonenumber}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md">
                      <PrimaryButton
                        onClick={() => onEditingMember(member.userid)}
                        buttonName={"Edit"}
                      />
                      <DangerButton
                        onClick={() => {
                          setDeleteMemberId(member.userid);
                          setDeleteMember(true);
                        }}
                        buttonName={"Delete"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">
                  <div className="d-grid gap-2 d-md-flex justify-content-between">
                    <PrimaryButton
                      onClick={onAddMember}
                      buttonName={"Add Member"}
                      className = "btn-sm"
                    />
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      goToPreviousPage={goToPreviousPage}
                      goToNextPage={goToNextPage}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="d-flex justify-content-end">
            Page {currentPage} of {totalPages}
          </div> */}
        </div>
      )}
    </>
  );
};

export default MemberTable;
