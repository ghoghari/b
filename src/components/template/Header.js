import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../actions/auth'

function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile_no: ""
})

  useEffect(() => {
    if (currentUser) {
        var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
        permission = permission != null ? permission : []
        let uData = currentUser?.data ? currentUser?.data : currentUser
        setUserData({
            name: uData.name,
            email: uData.email,
            mobile_no: uData.mobile_no
        });
    } else {
        return navigate("/login");
    }
}, [currentUser]);
  // var matches = currentUser.name.match(/\b(\w)/g); // ['J','S','O','N']
  // const acronym = matches.join('');
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/dashboard" className="nav-link">
              Home
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown show">
            <a className="nav-link" data-toggle="dropdown" href="#" aria-expanded="true">
              <i className="fas fa-user"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-lg droupData">
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img src="/users.png" alt="User Avatar" className="img-size-50 mr-3 img-circle"/>
                  <div className="media-body">
                    <h3 className="dropdown-item-title">{userData.name}</h3>
                    <h3 className="dropdown-item-title">Role: {currentUser?.data ? currentUser.data.role : currentUser?.role ? currentUser.role : ''}</h3>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <div className="d-flex p-2 justify-content-between">
                <div>
                  <NavLink to="/view-profile" className="btn btn-default btn-flat">Profile
                  </NavLink>
                </div>
                <div>
                  <a href="#" className="btn btn-default btn-flat" onClick={logOut}>
                    Logout
                  </a>
                </div>
                </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
