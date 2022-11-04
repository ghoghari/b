import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [userPermission, setUserPermission] = useState([]);
  useEffect(() => {
    if (currentUser) {
      var permission = currentUser?.data
        ? currentUser?.data.permission
        : currentUser?.permission;
      permission = permission != null ? permission : [];
      setUserPermission(permission);
    }
  }, [currentUser]);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ position: "fixed" }} >
      <a href="/dashboard" className="brand-link">
        <img
          src="/assets/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: "0.8" }}
        />
        <span className="brand-text font-weight-light">MERN V2</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" >
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            {userPermission.indexOf('View Customer') !== -1 ? (
              <li className="nav-item">
                <NavLink to="/manage-customers" className="nav-link">
                  <i className="far fa-user nav-icon"></i>
                  <p>Customers</p>
                </NavLink>
              </li>
            ) : null}
            {userPermission.indexOf('View Staff') !== -1 ? (
              <li className="nav-item">
                <NavLink to="/manage-admin" className="nav-link">
                  <i className="fas fa-users nav-icon"></i>
                  <p>Staff</p>
                </NavLink>
              </li>
            ) : null}
            {userPermission.indexOf('View Role') !== -1 ? (
              <li className="nav-item">
                <NavLink to="/manage-roles" className="nav-link">
                  <i className="nav-icon fab fa-critical-role"></i>
                  <p>Roles</p>
                </NavLink>
              </li>
            ) : null}
            {/* {userPermission.indexOf('View Role') !== -1 ? ( */}
              <li className="nav-item">
                <NavLink to="/manage-products" className="nav-link">
                  <i className="nav-icon fa fa-product-hunt"></i>
                  <p>Products</p>
                </NavLink>
              </li>
            {/* ) : null} */}
            {currentUser?.role === "Admin" ? <li className="nav-item">
              <NavLink to="/settings" className="nav-link">
                <i className="nav-icon fa fa-gear"></i>
                <p>Settings</p>
              </NavLink>
            </li> : null}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
export default Sidebar;
