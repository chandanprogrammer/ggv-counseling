import React from 'react'
import { use } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigator = useNavigate();
  return (
    <div className="dashboard-sidebar">
    <div className="dashboard-sidebar-heading" onClick={()=>{
      navigator('/dashboard');
    }}>
      <img
        className="home-icon icon"
        src="../../images/home_1.png"
        alt=""
      />
      Dashboard
    </div>
    <ul>
      <li>
        <img
          className="graduates-icon icon"
          src="../../images/group.png"
          alt=""
        />
        <Link to="/dashboard/all-students-list">All Students List</Link>
      </li>
      <li>
        <img
          className="graduates-icon icon"
          src="../../images/email.png"
          alt=""
        />
        <Link to="/all-students">Send Email</Link>
      </li>
    </ul>
  </div>
  )
}

export default Sidebar