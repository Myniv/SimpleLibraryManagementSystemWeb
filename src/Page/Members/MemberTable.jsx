/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmations";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import LoadingState from "../../Component/Elements/LoadingState";
import Pagination from "../../Component/Widgets/Pagination";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import MemberService from "../../service/member/MemberService";

const MemberTable = () => {
  const { member, setMember } = useOutletContext();
  const [deleteMember, setDeleteMember] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    MemberService.getAllUser()
      .then((res) => {
        const sortedMembers = res.data.sort((a, b) => a.userid - b.userid);
        setMember(sortedMembers);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.message);
        console.log(err);
      });
  }, [setMember]);

  useEffect(() => {
    if (deleteMember) {
      const deleteMember = () => {
        setLoading(true);
        MemberService.removeUser(deleteMemberId)
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
        <LoadingState />
      ) : errorMessage ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Member Table</h2>
            <PrimaryButton
              onClick={onAddMember}
              buttonName={"Add Member"}
              className="btn-sm"
            />
          </div>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">Privilage</th>
                <th scope="col">Notes</th>
                <th scope="col">Card Number</th>
                <th scope="col">Card Expired Date</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member) => (
                <tr scope="row" key={member.userId}>
                  <td>{member.userId}</td>
                  <td>
                    {member.fName} {member.lName}
                  </td>
                  <td>{member.userPosition}</td>
                  <td>{member.userPrivilage}</td>
                  <td>{member.userNotes}</td>
                  <td>{member.libraryCardNumber}</td>
                  <td>{member.libraryCardExpiredDate}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md">
                      <PrimaryButton
                        onClick={() => onEditingMember(member.userId)}
                        buttonName={"Edit"}
                      />
                      <DangerButton
                        onClick={() => {
                          setDeleteMemberId(member.userId);
                          setDeleteMember(true);
                        }}
                        buttonName={"Delete"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="8">
                  <div className="d-grid gap-2 d-md-flex justify-content-center">
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
