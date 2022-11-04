import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard";
import Master from "./pages/layout/Master";
import Customers from "./pages/customers";
import CustomersAdd from "./pages/customers/add";
import CommonComponent from "./components/commonCompont";
import ViewProfiles from "./pages/layout/profile";
import CustomersEdit from "./pages/customers/edit";
import Role from "./pages/roles";
import Permission from "./pages/roles/permission";
import Forbidden from "./pages/error/403";
import Forgotpassword from "./pages/auth/ForgotPassword";
import Recoverpassword from "./pages/auth/recoverPassword";
import RoleAdd from "./pages/roles/add";
import RoleEdit from "./pages/roles/edit";
import AdminList from "./pages/admins";
import AdminAdd from "./pages/admins/add";
import AdminEdit from "./pages/admins/edit";
import Setting from "./pages/settings";

import ProductsList from "./pages/products";
import ProductsAdd from "./pages/products/add";
import ProductsEdit from "./pages/products/edit";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      const routesArr = [
        {
          path: "manage-customers",
          label: "View Customer"
        },
        {
          path: "manage-customers-add",
          label: "Add Customer"
        },
        {
          path: "manage-customers-edit",
          label: "Edit Customer"
        },
        {
          path: "manage-customers",
          label: "View Customer"
        },
        {
          path: "manage-customers-add",
          label: "Add Customer"
        },
        {
          path: "manage-customers-edit",
          label: "Edit Customer"
        },
        {
          path: "manage-customers-view",
          label: "View Customer"
        },
        {
          path: "manage-admin",
          label: "View Staff"
        },
        {
          path: "manage-admin-view",
          label: "View Staff"
        },
        {
          path: "manage-admin-add",
          label: "Add Staff"
        },
        {
          path: "manage-admin-edit",
          label: "Edit Staff"
        },
        {
          path: "manage-roles",
          label: "View Role"
        },
        {
          path: "manage-roles-add",
          label: "Add Role"
        },
        {
          path: "manage-roles-edit",
          label: "Edit Role"
        },
        {
          path: "permission",
          label: "View Permission"
        },
        {
          path: "manage-products",
          label: "View Product"
        },
        {
          path: "manage-products-add",
          label: "Add Product"
        },
        {
          path: "manage-products-edit",
          label: "Edit Product"
        },
      ]

      const privateRoutes = ["dashboard", "view-profile", "manage-admin-import", "manage-users-list", 
    "403-error", "settings"]

      var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
      permission = permission != null ? permission : []

      const currentPath = window.location.pathname.split("/")
      const path = routesArr.find(d => d.path === currentPath[1])
      if (window.location.pathname !== "/" && permission.indexOf(path?.label) === -1 && !privateRoutes.includes(currentPath[1])) {
        return navigate('/403-error')
      }
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/" element={<Master />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/view-profile" element={<ViewProfiles />} />

        <Route path="/manage-customers" element={<Customers />} />
        <Route path="/manage-customers-add" element={<CustomersAdd />} />
        <Route path="/manage-customers-edit" element={<CustomersEdit />}>
          <Route path=":id" element={<CommonComponent />} />
        </Route>

        <Route path="/manage-admin" element={<AdminList />} />
        <Route path="/manage-admin-add" element={<AdminAdd />} />
        <Route path="/manage-admin-edit" element={<AdminEdit />}>
          <Route path=":id" element={<CommonComponent />} />
        </Route>

        <Route path="/manage-roles" element={<Role />} />
        <Route path="/manage-roles-add" element={<RoleAdd />} />
        <Route path="/manage-roles-edit" element={<RoleEdit />}>
          <Route path=":id" element={<CommonComponent />} />
        </Route>

        <Route path="/manage-products" element={<ProductsList />} />
        <Route path="/manage-products-add" element={<ProductsAdd />} />
        <Route path="/manage-products-edit" element={<ProductsEdit />}>
          <Route path=":id" element={<CommonComponent />} />
        </Route>


        <Route path="/permission" element={<Permission />}>
          <Route path=":id" element={<CommonComponent />} />
        </Route>
        <Route path="/403-error" element={<Forbidden />} />
      </Route>
      <Route
        path="/login"
        element={
          <div className="container-fluid px-0 login-wrapper">
            <Login />
          </div>
        }
      />
      <Route
        path="/forgotpassword"
        element={
          <div className="container-fluid px-0 login-wrapper">
            <Forgotpassword />
          </div>
        }
      />
      <Route path="/recoverpassword" element={
        <div className="container-fluid px-0 login-wrapper">
          <Recoverpassword />
        </div>
      }>
        <Route path=":id" element={<CommonComponent />} />
      </Route>
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};
export default App;
