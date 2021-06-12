import React from "react";
import login_pic from "../../assets/partnrd_logo.jpg.png";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useResetPassword } from "./useAuth";
import { ResetValidate } from "./validate";

export default function ResetPassword() {
  const { handleChange, fields, handleSubmit, errors, response, success} =
    useResetPassword(ResetValidate);
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
                  <p className="rst-card-description">
                    Enter Your New Password
                  </p>
                  {success.state && (
                    <div
                      className="alert alert-success text-center"
                      role="alert"
                    >
                      Your password has been reset! 
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                  {!success.state && (
                    <form onSubmit={handleSubmit}>
                      {response.error && <p>{response.message}</p>}
                      <div className="form-group mb-4">
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          value={fields.password}
                          onChange={handleChange}
                        />
                        {errors.password && <p>{errors.password}</p>}
                      </div>
                      <div className="form-group mb-4">
                        <label
                          htmlFor="password_confirmation"
                          className="sr-only"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="password_confirmation"
                          name="password_confirmation"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={fields.password2}
                          onChange={handleChange}
                        />
                        {errors.password_confirmation && (
                          <p>{errors.password_confirmation}</p>
                        )}
                      </div>
                      <button
                        name="submit"
                        className="btn btn-block login-btn mb-4"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
