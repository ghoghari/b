import React, { useEffect } from "react";
import Heading from "../../components/template/Heading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Forbidden = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      return navigate("/login")
    }
  }, [currentUser]);
  

  return (
    <>
      <div className="content-wrapper">
        <Heading pageTitle="404 Error" innerPage={false} />
        <section className="content">
        <div className="container-fluid">
            <div className="error-page">
              <h2 className="headline text-warning"> 404 </h2>
              <div className="error-content">
                <h3>
                  <i className="fas fa-exclamation-triangle text-warning"></i>{" "}
                  Oops! Page not found.
                </h3>
                <p>
                We could not find the page you were looking for. Meanwhile, you may return to  &nbsp; 
                <NavLink to="/">
                  Dashboard
              </NavLink>
              &nbsp; or try using the search form.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Forbidden;
