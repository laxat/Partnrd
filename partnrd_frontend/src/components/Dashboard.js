import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export class Dashboard extends Component {
  
  render() {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Redirect to="/login"/>
    }
        return (
          <div>
            <h1>Dashboard</h1>
          </div>
        ); 
    }
}

export default Dashboard
