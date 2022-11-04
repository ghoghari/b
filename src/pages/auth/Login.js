import { login } from "../../actions/auth";
import React, { useState } from "react";
import { useNavigate , Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Login(props) {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false)
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [errorPwd, setErrorPwd] = useState("")
  const [errorError, setErrorError] = useState("")
  const [formVaild, SetFormVaild] = useState(true)

  const regExp = RegExp(/^[a-zA-Z0-9_@./#&+-]+@[a-zA-Z0-9_@./#&+-]+\.[A-Za-z]+$/)
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
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
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (e.target.value) {
      setErrorPwd("")
      SetFormVaild(false)
    } else if(e.target.value.length == 0){
      setErrorPwd('Password is required.')
      SetFormVaild(true)
    }
    setPassword(e.target.value);
  };

  const handleRememberChange = (e) => {
    if (e.target.type == "checkbox") {
      if (e.target.checked) {
        setRemember(true);
      } else {
        setRemember(false);
      }
    }
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    var loginDetail = {
      email: email,
      password: password,
      roleType: 'Admin',
    };
    if(!loginDetail.email){
      setShow(false)
      setErrorError('Email is required.')
      return
    }
    if(!loginDetail.password){
      setShow(false)
      setErrorPwd('Password is required.')
      return
    }
    dispatch(login(loginDetail))
      .then(() => {
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log("catch", e);
      });
    setTimeout(function () {
      setShow(true)
    }, 1000);
    setTimeout(function () {
      setShow(false)
    }, 3000);
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
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
                Login To Your Account
              </div>
              <div className="card">
                <div className="card-body login-card-body">
                  <p className="login-box-msg text-uppercase">Login with email</p>
                  <form id="login-form">
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
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
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={handlePasswordChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fa fa-lock"></span>
                        </div>
                      </div>
                    </div>
                    {errorPwd && (
                      <div className="text-danger font-weight-bold mb-2">{errorPwd}</div>
                    )}
                    <div className="row">
                      <div className="col-12">
                        <div className="icheck-primary">
                          <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            onChange={handleRememberChange}
                          />
                          <label htmlFor="remember">
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <div className="col-12 mb-2">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={handleClickSubmit}
                          disabled={formVaild}
                        > Sign In </button>
                      </div>
                    </div>
                    <div className="form-group">
                      {show && (
                        <div className="alert alert-danger mt-2" role="alert" >
                          {message}
                        </div>
                      )}
                    </div>
                  </form>
                  <p className="mb-1">
                    <NavLink className="btn btn-link f-14 p-0" to="/forgotpassword">
                      Forgot Your Password?
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
