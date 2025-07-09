// File Login4Admin.js
import './Login4Admin.scss'

import { useState } from "react"
import { URL_WEB } from "../../constants"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { message } from 'antd'

function Login4Admin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            // POST to Backend
            const response = await axios.post(`${URL_WEB}/auth/login`, {
                username: username,
                password: password,
                role: 'ADMIN'
            })
            message.success('Admin login successful')
            // console.log('Token when login', response.data.data.accessToken)
            localStorage.setItem('token', response.data.data.accessToken)
            navigate('/admin-home')
        }
        catch(e) {
            console.log('Admin login failed', e)
            message.error('Admin login failed')
        }
    }

    const HandleUser = () => {
        navigate('/')
    }

    return (
        <div className="admin-login-container">
            <div className="wrapper">
                <form onSubmit={HandleSubmit} className="admin-login">
                    <h1>Admin Login</h1>
                    
                    <div className="input-box">
                        <input 
                            placeholder="Username" 
                            type="text" 
                            required
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox"/>
                            Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn">Login</button>

                    <div className="user-link">
                        <p>Are you a user? <a onClick={HandleUser}>User Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login4Admin