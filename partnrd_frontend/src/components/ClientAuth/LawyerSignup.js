import React from "react";
import "../../assets/login.css";
import login_pic from "../../assets/partnrd_logo.jpg.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import registerValidate from "./validate";
import { useSignup } from "./useAuth";

export default function LawyerSignup() {
    const {
      handleRegisterChange,
      values,
      handleSubmit,
      errors,
      response,
      success,
    } = useSignup(registerValidate);

  return (
    <div>
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
          <div className="card login-card">
            <div className="row no-gutters">
              <div className="col-md-5">
                <img src={login_pic} alt="login" className="signup-card-img" />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <p className="login-card-description">
                    Register a new lawyer account
                  </p>
                  {success.state && <p>{success.message}</p>}
                  {!success.state && (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        {response.error && <p>{response.message}</p>}
                        <label htmlFor="name" className="sr-only">
                          Full Name
                        </label>
                        <input
                          type="name"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Full Name"
                          value={values.name}
                          onChange={handleRegisterChange}
                        />
                        {errors.name && <p>{errors.name}</p>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Email address"
                          value={values.email}
                          onChange={handleRegisterChange}
                        />
                        {errors.email && <p>{errors.email}</p>}
                      </div>
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
                          value={values.password}
                          onChange={handleRegisterChange}
                        />
                        {errors.password && <p>{errors.password}</p>}
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password2" className="sr-only">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="password2"
                          name="password2"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={values.password2}
                          onChange={handleRegisterChange}
                        />
                        {errors.password2 && <p>{errors.password2}</p>}
                      </div>
                      <button
                        name="submit"
                        className="btn btn-block login-btn mb-4"
                        type="submit"
                      >
                        Register
                      </button>
                    </form>
                  )}
                  <p className="signup-card-footer-text">
                    Already have an account?{" "}
                    <Link to="/login" className="text-reset">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
