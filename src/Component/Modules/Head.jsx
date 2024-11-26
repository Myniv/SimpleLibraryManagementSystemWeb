import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/authSlice";
import { Container, Navbar } from "react-bootstrap";
import LogoutConfirmation from "../Elements/LogoutConfirmation";

const HeaderFunction = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      visibleForAll: true,
    },
    {
      label: "Profile",
      path: "/profile",
      visibleForRoles: ["Librarian", "Library Manager", "Library User"],
    },
    {
      label: "Book List",
      path: "/books",
      visibleForRoles: ["Librarian", "Library Manager"],
    },
    {
      label: "Users",
      path: "/members",
      visibleForRoles: ["Library Manager"],
    },
    {
      label: "Login",
      path: "/login",
      isAuthenticated: false,
    },
    {
      label: "Register",
      path: "/register",
      isAuthenticated: false,
    },
    {
      label: "Logout",
      isAuthenticated: true,
    },
  ];

  const isMenuVisible = (item) => {
    //for showing all menu to user
    if (item.visibleForAll) {
      return true;
    }

    //for showing pages if are not login yer
    if (item.isAuthenticated === false && !currentUser) {
      return true;
    }

    //for showing logout if already login
    if (item.label === "Logout" && currentUser) {
      return true;
    }

    //for role for spesifict menu
    if (item.visibleForRoles && currentUser?.role) {
      return item.visibleForRoles.some((role) =>
        currentUser.role.includes(role)
      );
    }

    return false;
  };

  const handleLogout = () => {
    LogoutConfirmation({
      logout: () => dispatch(logout(currentUser.refreshToken)),
      nextPage: () => navigate("/"),
    });
  };

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <title>Library Management</title>
          <h1 className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            Library Management
          </h1>
          <Navbar bg="dark" expand="lg">
            <Container>
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav nav-pills">
                {menuItems.filter(isMenuVisible).map((item, index) => (
                  <li className="nav-item" key={index}>
                    <NavLink
                      key={index}
                      to={item.path}
                      onClick={item.label === "Logout" ? handleLogout : null}
                      className={({ isActive }) => {
                        return isActive && !item.label === "Logout"
                          ? "nav-link active"
                          : "nav-link";
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Container>
          </Navbar>
          {currentUser && (
            <hd>
              Welcome,{" "}
              <strong>
                {currentUser.user?.userName
                  ? currentUser.user.userName
                  : currentUser.role}
              </strong>
            </hd>
          )}
        </div>
      </div>
    </header>
  );
};

export { HeaderFunction };

{
  /* <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav nav-pills">
  <li className="nav-item">
    <NavLink
      to="/"
      className={({ isActive }) => {
        return isActive ? "nav-link active" : "nav-link";
      }}
    >
      Menu
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink
      to="/searchbooks"
      className={({ isActive }) => {
        return isActive ? "nav-link active" : "nav-link";
      }}
    >
      Search Books
    </NavLink>
  </li>

  <li className="nav-item">
    <NavLink
      to="/books"
      className={({ isActive }) => {
        return isActive ? "nav-link active" : "nav-link";
      }}
    >
      Books
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink
      to="/members"
      className={({ isActive }) => {
        return isActive ? "nav-link active" : "nav-link";
      }}
    >
      Members
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink
      to="/transactions"
      className={({ isActive }) => {
        return isActive ? "nav-link active" : "nav-link";
      }}
    >
      Borrow
    </NavLink>
  </li>
</ul> */
}
