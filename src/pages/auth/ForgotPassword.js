import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/auth.service";

function Forgotpassword(props) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { message } = useSelector((state) => state.message)
  // const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [errorError, setErrorError] = useState("")
  const [formVaild, SetFormVaild] = useState(true)
  const regExp = RegExp(
    /^[a-zA-Z0-9_@./#&+-]+@[a-zA-Z0-9_@./#&+-]+\.[A-Za-z]+$/
  )
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (regExp.test(e.target.value)) {
      SetFormVaild(false)
      setErrorError('')
    } else if(e.target.value.length == 0){
      SetFormVaild(true)
      setErrorError('Email is required.')
    } else {
      SetFormVaild(true)
      setErrorError('Please enter valid email address.')
    }
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    var forgotPasswordDetail = {
      email: email
    };
    if(!forgotPasswordDetail.email){
      setErrorError('Email is required.')
      return
    }
    SetFormVaild(true)
    authService.forgotPassword(forgotPasswordDetail).then((res) => {
      if (res.response === true) {
        setMessage(res.message)
        SetFormVaild(false)
      } else {
        setMessage(res.message)
        SetFormVaild(false)
      }
    }) .catch(err => {
      console.log(err)
        setMessage(err)
        SetFormVaild(false)
    })
    setTimeout(() => {
      setMessage("")
      setEmail("")
      SetFormVaild(true)
      navigate("/");
    }, 20000);
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
              <h1 className="text-white font-weight-bold display-3">Welcome to <br/>MERN V2s</h1>
              <p className="text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit facilisis facilisis viverra.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 h-100">
          <div className="h-100 login-end py-5 py-md-0 position-relative d-flex align-items-center justify-content-center">
            <div className="login-box">
              <div className="login-logo">
               Recover Your Password
              </div>
              <div className="card">
                  <div className="card-body login-card-body">
                      {/* <p className="login-box-msg text-uppercase">Login with email</p> */}
                      <form id="forgotpassword-form">
                        <div className="input-group mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Your Email Address"
                            name="email"
                            onChange={handleEmailChange}
                          />
                          <div className="input-group-append">
                              <div className="input-group-text">
                                  <span className="fa fa-envelope"></span>
                              </div>
                          </div>
                        </div>
                        {errorError && (
                          <div className="text-danger font-weight-bold mb-2">{errorError}</div>
                        )}
                        <div className="row">
                          <div className="col-12 mb-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                              onClick={handleClickSubmit}
                              disabled={formVaild}> Send Password Reset Link
                            </button>
                            </div>
                        </div>
                          <div className="form-group">
                          {message && (
                            <div className="alert alert-danger mt-2" role="alert">
                              {message}
                            </div>
                          )}
                          </div>
                      </form>
                      <p className="mb-1">
                        <Link className="btn btn-link f-14 p-0" to="/login"> Back to Login </Link>
                      </p>
                  </div>
              </div>
            </div>
          {/* <div className="position-absolute signup-text text-center w-100">Don't have an account? <a href="#">Sign Up</a></div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgotpassword;
