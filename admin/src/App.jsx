import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPopup from './components/LoginPopup/LoginPopup'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [adminToken, setAdminToken] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("admin-token")
    if (token) {
      setAdminToken(token)
    }
  }, [])

  useEffect(() => {
    if (!adminToken) {
      setShowLogin(true)
    }
  }, [adminToken])

  return (
    <div className='app'>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} setAdminToken={setAdminToken} />}
      <Navbar setShowLogin={setShowLogin} adminToken={adminToken} setAdminToken={setAdminToken} />
      <hr />
      {adminToken && (
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App