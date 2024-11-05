import { useState } from "react";
import { Outlet } from "react-router-dom";

function MembersPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedmember, setSelectedmember] = useState(null);
  const [member, setmember] = useState([]);

  return (
    <>
      <Outlet
        context={{
          member,
          setmember,
          isEditing,
          setIsEditing,
          selectedmember,
          setSelectedmember,
        }}
      />
    </>
  );
}

export default MembersPage;
