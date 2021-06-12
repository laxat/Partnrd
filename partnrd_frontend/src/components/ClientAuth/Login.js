import React from "react";
import "../../assets/login.css";
import login_pic from "../../assets/partnrd_logo.jpg.png";
import { Link } from "react-router-dom";
import {useLogin} from "./useAuth";
import  { LoginValidate } from "./validate";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const { handleLoginChange, fields, handleSubmit, errors, response } =
    useLogin(LoginValidate);
  const token = localStorage.getItem("token");
  if (token) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
          <div className="card login-card">
            <div className="row no-gutters">
              <div className="col-md-5">
                <img src={login_pic} alt="login" className="login-card-img" />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <p className="login-card-description">
                    Sign into your account
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      {response.error && <p>{response.message}</p>}
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        value={fields.email}
                        onChange={handleLoginChange}
                      />
                      {errors.email && <p>{errors.email}</p>}
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        value={fields.password}
                        onChange={handleLoginChange}
                      />
                      {errors.password && <p>{errors.password}</p>}
                    </div>
                    <button
                      name="submit"
                      className="btn btn-block login-btn mb-4"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                  <nav className="login-card-footer-nav">
                    <Link to="/signup">Register | </Link>
                    <Link to="/password/email">Forgot Password?</Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
