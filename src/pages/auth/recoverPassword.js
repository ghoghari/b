import { recoverPassword } from "../../actions/auth";
import React, { useState,useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Recoverpassword(props) {
  let { id } = useParams()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setCPassword] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [errorError, setErrorError] = useState("")
  const [errorPwd, setErrorPwd] = useState("")
  const [errorCPwd, setErrorCPwd] = useState("")
  const [formVaild, SetFormVaild] = useState(true)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    if (e.target.value.length >= 5) {
      setErrorPwd("")
      SetFormVaild(false)
    } else {
      setErrorPwd('Password Must be at least 5 chars long.')
      SetFormVaild(true)
    }
    setPassword(e.target.value);
  };

  const handleCPasswordChange = (e) => {
    if (e.target.value.length >= 5) {
        setErrorCPwd("")
      SetFormVaild(false)
    } else {
      setErrorCPwd('Confrim Password Must be at least 5 chars long.')
      SetFormVaild(true)
    }
    setCPassword(e.target.value);
  };

  useEffect(() => {
    console.log("Id :",id)
  })
  const handleClickSubmit = (e) => {
    e.preventDefault();
    var recoverPasswordDetail = {
      user_verification_token: id,
      password: password,
      confirm_password: confirmpassword,
    };
    dispatch(recoverPassword(recoverPasswordDetail))
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log("catch", e);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <div className="row h-100">
      <div className="col-lg-6 col-md-6 h-100 pr-0">
        <div className="h-100 login-start position-relative">
          <img src="/assets/dist/img/login-bg.jpg" className="w-100 h-100" alt="Login Image" />
          <div className="position-absolute login-content">
            <h1 className="text-white font-weight-bold display-3">Welcome to <br />MERN V2</h1>
            <p className="text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit facilisis facilisis viverra.</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 h-100">
        <div className="h-100 login-end py-5 py-md-0 position-relative d-flex align-items-center justify-content-center">
          <div className="login-box">
            <div className="login-logo">
              Recover Your Account
            </div>
            <div className="card">
              <div className="card-body login-card-body">
                <form id="login-form">
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      name="password"
                      onChange={handlePasswordChange}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  {errorPwd && (
                    <div className="text-danger font-weight-bold mb-2">{errorPwd}</div>
                  )}
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="Confirm Password"
                      onChange={handleCPasswordChange}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  {errorCPwd && (
                    <div className="text-danger font-weight-bold mb-2">{errorCPwd}</div>
                  )}
                  <div className="row">
                    <div className="col-12 mb-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={handleClickSubmit}
                        disabled={formVaild}> Submit
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger mt-2" role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                    {/* {show && (
                      <div className="alert alert-danger mt-2" role="alert" >
                        {message}
                      </div>
                    )} */}
                  </div>
                </form>
                {/* <p className="mb-1">
                  <NavLink className="btn btn-link f-14 p-0" to="/forgotpassword">
                    Forgot Your Password?
                  </NavLink>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Recoverpassword;
