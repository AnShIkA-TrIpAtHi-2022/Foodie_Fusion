import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setShowLogin, adminToken, setAdminToken }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("admin-token")
    setAdminToken("")
    navigate("/")
  }

  return (
    <div className='navbar'>
      <h1>Foodie Fusion</h1>
      <div className="navbar-profile">
        {adminToken ? (
          <>
            <img className='profile' src={assets.profile_image} alt="" />
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)} className="login-btn">Login</button>
        )}
      </div>
    </div>
  )
}

export default Navbar