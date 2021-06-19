import React from "react";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import login_pic from "../../assets/partnrd_logo.jpg.png";



export function VerifySuccess()
{
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
                      This email is now verified
                    </p>
                    <div
                      className="alert alert-success text-center"
                      role="alert"
                    >
                      You can now <Link to="/login">login</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    ); 
}

export function VerifyFailed() {
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
                    This Email is already Verified
                  </p>
                  <div className="alert alert-success text-center" role="alert">
                    You can now {" "} <Link to="/login">login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}