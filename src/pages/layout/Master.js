import React, { Component } from "react";
import Header from "../../components/template/Header";
import PreLoader from "../../components/template/Preloader";
import Sidebar from "../../components/template/Sidebar";
import Footer from "../../components/template/Footer";

import { Outlet } from "react-router-dom";

class Master extends Component {
  render() {
    return (
        // <Router>
            <div className="hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
                <div className="wrapper">
                <Header />
                <Sidebar />
                <Outlet />
                <Footer />
                </div>
            </div>
        // </Router>
    );
  }
}

export default Master;
