import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("Current User:", currentUser);

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <div className="d-flex align-items-center justify-content-center">
          <img
            src="/img/boyIcon.png"
            alt="Profile"
            className="rounded-circle me-3"
            width="100"
            height="100"
          />
          <div>
            <h3 className="m-0">
              {currentUser.user.fName} {currentUser.user.lName}
            </h3>

            <p className="text-muted m-0">
              Position:{" "}
              {currentUser.user.userPosition
                ? currentUser.user.userPosition
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <Card>
        <Card.Body>
          <h5>Personal Information</h5>
          <div className="mb-3">
            <strong>Personal Data</strong>
            <p>Privilage: {currentUser.user.userPrivilage}</p>
            <p>
              Card Number:{" "}
              {currentUser.user.libraryCardNumber
                ? currentUser.user.libraryCardNumber
                : "N/A"}
            </p>
          </div>
          <div className="mb-3">
            <p>Expired Date: {currentUser.user.libraryCardExpiredDate}</p>
          </div>
          <div className="mb-3">
            <strong>Contact</strong>
            <p>
              Primary Email: {currentUser.email ? currentUser.email : "N/A"}
            </p>
          </div>
          <div className="mb-3">
            <strong>Roles: {currentUser?.role}</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
