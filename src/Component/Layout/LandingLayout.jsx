import { Outlet } from "react-router";
import { HeaderFunction } from "../Modules/Head";
import { FooterFunction } from "../Modules/Foot";

const LandingLayout = () => {
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

export default LandingLayout;
