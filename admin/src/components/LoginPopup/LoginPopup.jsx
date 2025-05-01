import React, { useState } from 'react'
import './LoginPopup.css'
import { assets, url } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin, setAdminToken }) => {

    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        try {
            let endpoint = currState === "Login" ? "/api/admin/login" : "/api/admin/register";
            const response = await axios.post(url + endpoint, data);
            
            if (response.data.success) {
                setAdminToken(response.data.token)
                localStorage.setItem("admin-token", response.data.token)
                setShowLogin(false)
                toast.success(`Admin ${currState} Successful`)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>Admin {currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder='Admin name' 
                            required 
                        />
                    )}
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder='Email address' 
                        required 
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Password' 
                        required 
                    />
                </div>
                <button type="submit">{currState}</button>
                {currState === "Login" 
                    ? <p>Create new admin account? <span onClick={() => setCurrState('Sign Up')}>Sign Up</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup