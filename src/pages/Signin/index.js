// File Signin.js
import './Signin.scss'
import { useState } from "react"
import { URL_WEB } from "../../constants"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { message } from 'antd'

function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dob, setDob] = useState("")
    
    const navigate = useNavigate()

    const HandleSubmit = async (e) => {
        e.preventDefault()

        try {
            // POST tới Backend
            await axios.post(`${URL_WEB}/user`, {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                dob: dob
            })
            // Handle successful registration
            message.success('Registration successful')
            navigate('/') // Navigate to login page after successful registration
        }
        catch {
            message.error('Registration failed')
        }
    }

    const HandleLogin = () => {
        navigate('/')
    }

    return (
        <div className="signin-container">
            <div className="wrapper">
                <form onSubmit={HandleSubmit} className="signin">
                    <h1>Register</h1>
                    
                    <div className="input-box">
                        <input 
                            placeholder="User name" 
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

                    <div className="input-box">
                        <input 
                            placeholder="First name" 
                            type="text" 
                            required
                            onChange={(e) => setFirstName(e.target.value)} 
                        />
                    </div>

                    <div className="input-box">
                        <input 
                            placeholder="Last name" 
                            type="text" 
                            required
                            onChange={(e) => setLastName(e.target.value)} 
                        />
                    </div>

                    <div className="input-box">
                        <input 
                            placeholder="BOD" 
                            type="date" 
                            required
                            onChange={(e) => setDob(e.target.value)} 
                        />
                    </div>

                    {/* <div className="terms-privacy">
                        <label>
                            <input type="checkbox" required/>
                            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                        </label>
                    </div> */}

                    <button type="submit" className="btn">Register</button>

                    <div className="login-link">
                        <p>Already have an account? <a onClick={HandleLogin}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin