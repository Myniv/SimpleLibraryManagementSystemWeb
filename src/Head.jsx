import { NavLink } from "react-router-dom";

const HeaderFunction = () => {
  // const currentDate = new Date().toDateString();
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <title>Library Management</title>
          <h1 className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            Library Management
          </h1>
          {/* <p className="text-end">{currentDate}</p> */}
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav nav-pills">
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
                Customer
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export { HeaderFunction };
