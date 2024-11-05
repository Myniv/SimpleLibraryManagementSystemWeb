import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const MemberTable = () => {
  const { member, setMember, setIsEditing, setSelectedMember } =
    useOutletContext();

  useEffect(() => {
    const storedMember = JSON.parse(localStorage.getItem("member")) || [];
    setMember(storedMember);
  }, [setMember]);

  const onDeleteMember = (id) => {
    const confirmMessage = "Are you sure want to delete this member?";
    if (confirm(confirmMessage)) {
      const storedMember = JSON.parse(localStorage.getItem("member")) || [];
      const deleteMember = storedMember.filter((b) => b.id !== id);

      localStorage.setItem("member", JSON.stringify(deleteMember));
      setMember(deleteMember);
    }
  };

  const onEditingMember = (id) => {
    const selectMember = member.find((member) => member.id === id);
    setSelectedMember(selectMember);
    setIsEditing(true);
    //TODO add Navigate to edit Form
  };

  const onAddmember = () => {
    //TODO Add Navigate to add form
    console.log("Add member");
  };

  return (
    <>
      <div className="m-4">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col">Publication Year</th>
              <th scope="col">ISBN</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {member.map((member) => (
              <tr scope="row" key={member.id}>
                <td key={member.id}>{member.id}</td>
                <td key={member.title}>{member.title}</td>
                <td key={member.author}>{member.author}</td>
                <td key={member.category}>{member.category}</td>
                <td key={member.publicationyear}>{member.publicationyear}</td>
                <td key={member.isbn}>{member.isbn}</td>
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
                      onClick={onAddmember}
                    >
                      Add member
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

export default MemberTable
