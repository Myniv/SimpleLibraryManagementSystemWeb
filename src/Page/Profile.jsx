import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("Current User:", currentUser);


  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container">
      <p>
        <strong>Email</strong> {currentUser?.email || "No Email"}
      </p>
      <strong>Roles: {currentUser?.role}</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
