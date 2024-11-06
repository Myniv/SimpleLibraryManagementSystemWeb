import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../Widgets/DeleteConfirmations";

const MemberTable = () => {
  const { member, setMember, setIsEditing, setSelectedMember } =
    useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    const storedMember = JSON.parse(localStorage.getItem("member")) || [];
    setMember(storedMember);
  }, [setMember]);

  const onDeleteMember = (id) => {
    const isDelete = () => {
      const storedMember = JSON.parse(localStorage.getItem("member")) || [];
      const deleteMember = storedMember.filter((b) => b.id !== id);

      localStorage.setItem("member", JSON.stringify(deleteMember));
      setMember(deleteMember);
    };

    DeleteConfirmation({ deleteData: () => isDelete() });
  };

  const onEditingMember = (id) => {
    const selectMember = member.find((member) => member.id === id);
    setSelectedMember(selectMember);
    setIsEditing(true);
    navigate(`/members/${id}`);
  };

  const onAddMember = () => {
    navigate("/members/add");
  };

  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Member Table</h2>
        </div>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {member.map((member) => (
              <tr scope="row" key={member.id}>
                <td>{member.id}</td>
                <td>{member.fullname}</td>
                <td>{member.email}</td>
                <td>{member.gender}</td>
                <td>{member.phonenumber}</td>
                <td>{member.address}</td>
                <td>
                  <div className="d-grid gap-2 d-md-flex justify-content-md">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => onEditingMember(member.id)}
                      value={"edit"}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => onDeleteMember(member.id)}
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
    </>
  );
};

export default MemberTable;
