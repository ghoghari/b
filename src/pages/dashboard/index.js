/*eslint-disable*/

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import dashboardService from "../../services/dashboard.service";
import { useSelector } from "react-redux";
// import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState([])
  const [adminData, setAdminData] = useState([])
  const [viewCampaignsPermission, setViewCampaignsPermission] = useState(true);
  const [viewCustomersPermission, setViewCustomersPermission] = useState(true);
  const [viewStaffPermission, setViewStaffPermission] = useState(true);
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    getData();
    if (!currentUser) {
      return navigate("/login")
    } else {
      var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
      permission = permission != null ? permission : []
      if (permission.indexOf('View Campaigns') === -1) {
        setViewCampaignsPermission(false)
      }

      if (permission.indexOf('View Customer') === -1) {
        setViewCustomersPermission(false)
      }
      if (permission.indexOf('View Staff') === -1) {
        setViewStaffPermission(false)
      }
    }
  }, [currentUser])
  const getData = () => {
    dashboardService.getDashboard().then((res) => {
      setUserData(res.data.countAll.usercount)
      setAdminData(res.data.countAll.admincount)
    }).catch(err => {
      console.log(err)
    })
  };
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{campaignlotData}</h3>
                  <p>Campaign Lots</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <NavLink to="/product-lot" className="small-box-footer">
                More info 
                  <i className="fas fa-arrow-circle-right"></i>
                </NavLink>
              </div>
            </div> */}

            {viewCustomersPermission &&<div className="col-lg-3 col-6">
              <NavLink to="/manage-customers">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{userData}</h3>
                    <p>Customers</p>
                  </div>
                  <div className="icon">
                    <i className="far fa-user nav-icon"></i>
                  </div>
                  <NavLink to="/manage-customers" className="small-box-footer">
                    More info
                    <i className="fas fa-arrow-circle-right"></i>
                  </NavLink>
                </div>
              </NavLink>
            </div>
}

            {viewStaffPermission &&<div className="col-lg-3 col-6">
              <NavLink to="/manage-admin">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{adminData}</h3>
                    <p>Staff</p>
                  </div>
                  <div className="icon">
                    <i className="ion  ion-android-people"></i>
                  </div>
                  <NavLink to="/manage-admin" className="small-box-footer">
                    More info
                    <i className="fas fa-arrow-circle-right"></i>
                  </NavLink>
                </div>
              </NavLink>
            </div>}

            {/* <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{roleData}</h3>
                  <p>Roles</p>
                </div>
                <div className="icon">
                  <i className="ion ion-ios-person"></i>
                </div>
                <NavLink to="/manage-roles" className="small-box-footer">
                More info 
                  <i className="fas fa-arrow-circle-right"></i>
                </NavLink>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Dashboard;
