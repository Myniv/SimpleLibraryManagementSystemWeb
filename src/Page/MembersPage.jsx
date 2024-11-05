import { useState } from "react";
import { Outlet } from "react-router-dom";

function MembersPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [member, setMember] = useState([]);

  return (
    <>
      <Outlet
        context={{
          member,
          setMember,
          isEditing,
          setIsEditing,
          selectedMember,
          setSelectedMember,
        }}
      />
    </>
  );
}

export default MembersPage;
