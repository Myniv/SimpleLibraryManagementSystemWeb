import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
// import DeleteConfirmation from "../../Component/Elements/DeleteConfirmations";
import axios from "axios";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmations";

const MemberTable = () => {
  const { member, setMember } = useOutletContext();

  const [deleteMember, setDeleteMember] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState(0);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5265/api/Users")
      .then((res) => {
        setMember(res.data);
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
            setMember(res.data);
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
    // setIsAdding(true);
    navigate("/members/add");
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <img src="/LoadingSpinner.svg" alt="Loading..." />
        </div>
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
              {member.map((member) => (
                <tr scope="row" key={member.userid}>
                  <td>{member.userid}</td>
                  <td>{member.username}</td>
                  <td>{member.phonenumber}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => onEditingMember(member.userid)}
                        value={"edit"}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setDeleteMemberId(member.userid);
                          setDeleteMember(true);
                        }}
                        value={"delete"}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7">
                  <div className="d-flex justify-content-end">
                    <div className="d-grid gap-2 col-2">
                      <button
                        type="button"
                        className="btn btn-primary  btn-block me-1"
                        onClick={onAddMember}
                      >
                        Add Member
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MemberTable;
