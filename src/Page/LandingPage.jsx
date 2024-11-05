import { Outlet } from "react-router";
import { HeaderFunction } from "../Head";
import { FooterFunction } from "../Foot";

const LandingPage = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <HeaderFunction />
        <div className="flex-grow-1">
          <Outlet />
        </div>
        <FooterFunction />
      </div>
    </>
  );
};

export default LandingPage;
