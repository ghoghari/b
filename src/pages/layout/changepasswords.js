import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { NavLink, useNavigate } from "react-router-dom";
import ActionIcon from "../../components/table/actionIcon";
import Heading from "../../components/template/Heading";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import userService from "../../services/user.service";
import swal from "sweetalert";
import InputText from "../../components/inputFields/inputText";
import BackButton from "../../components/buttons/backButton";

function PasswordChange() {
  let navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [error, setError] = useState({});
  const [userData, setUserData] = useState({
    currentpassword: "",
    newpassword: "",
    changepassword: "",
    email: ""
  })
  useEffect(() => {
    if (currentUser) {
      var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
      permission = permission != null ? permission : []
      //   if (permission.indexOf('View User') === -1) {
      //     return navigate('/403-error')
      //   }

      //   if (permission.indexOf('View User') !== -1) {
      //     setViewPermission(true)
      //   }

      //   if (permission.indexOf('Delete User') !== -1) {
      //     setDeletePermission(true)
      //   }

      //   if (permission.indexOf('Edit User') !== -1) {
      //     setEditPermission(true)
      //   }

      //   setUserPermission(permission);
      setTitle("Change password");
    } else {
      return navigate("/login");
    }
  }, [currentUser]);

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    userData.email = currentUser.email;
    var user_data = userData;
    userService.changePassword(user_data).then((res) => {
      if (res.response == true) {
        swal({
          title: "Success!",
          text: res.message,
          icon: "success",
        })
      } else {
        swal({
          title: "Error!",
          text: res.message,
          icon: "error",
        });
      }
    })
      .catch(err => {
        console.log(err)
      })
    setError(validate(userData));
  }
  const validate = (value) => {
    const errors = {}
    if (!value.currentpassword) {
      errors.currentpassword = "Current password is required"
    }
    else {
      errors.currentpassword = ""
    }
    if (!value.newpassword) {
      errors.newpassword = "New password is required"
    }
    if (!value.changepassword) {
      errors.changepassword = "Change password is required"
    }
    if (value.newpassword != value.changepassword) {
      errors.changepassword = "Passwords don't match.";
    }
    return errors;
  }
  return (
    <div className="content-wrapper">
      <Heading mainTitle={"Change password"} url='/' innerPage={false} pageTitle={title} />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <form onSubmit={e => onSubmit(e)} >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <InputText
                            label="Current Password"
                            name="currentpassword"
                            value={userData.currentpassword}
                            onChange={e => onInputChange(e)}
                            placeholder="Current Password"
                            type="password"
                          />
                          <p className="text-danger pl-2">{error.currentpassword}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <InputText
                            label="New Password"
                            name="newpassword"
                            value={userData.newpassword}
                            onChange={e => onInputChange(e)}
                            placeholder="New Password"
                            type="password"
                          />
                          <p className="text-danger pl-2">{error.newpassword}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <InputText
                            label="Confirm Password"
                            name="changepassword"
                            value={userData.changepassword}
                            onChange={e => onInputChange(e)}
                            placeholder="Confirm Password"
                            type="password"
                          />
                          <p className="text-danger pl-2">{error.changepassword}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="d-flex justify-content-start w-100">
                        <button className="btn btn-primary" >Save</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default PasswordChange;
