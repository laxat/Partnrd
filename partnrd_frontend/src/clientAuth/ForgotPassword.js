import React from "react";
import { Link } from "react-router-dom";
import login_pic from "../assets/partnrd_logo.png";
import { useEmail } from "./useAuth";
import { ForgotValidate } from "./validate";

export default function ForgotPassword() {
  const { handleEmailChange, fields, handleSubmit, errors, response, success } =
    useEmail(ForgotValidate);

  return (
    <div>
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
          <div className="card login-card">
            <div className="row no-gutters">
              <div className="col-md-12">
                <div className="card-body">
                  <img src={login_pic} alt="login" className="login-card-img" />
                  <p className="rst-card-description">Forgot Password</p>
                  {success.state && (
                    <div
                      className="alert alert-success text-center"
                      role="alert"
                    >
                      A password reset link has been sent!
                    </div>
                  )}
                  {!success.state && (
                    <form onSubmit={handleSubmit}>
                      <div className="rst-form-group">
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Email address"
                          value={fields.email || ""}
                          onChange={handleEmailChange}
                        />
                        {errors.email && <p>{errors.email}</p>}
                        {response.error && <p>{response.message}</p>}
                      </div>
                      <button
                        name="submit"
                        className="btn btn-block login-btn mb-4"
                        type="submit"
                      >
                        Send Email
                      </button>
                    </form>
                  )}
                  {!success.state && (
                    <p className="signup-card-footer-text">
                      I remember my password:{" "}
                      <Link to="/login" className="text-reset">
                        Login
                      </Link>
                    </p>
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
