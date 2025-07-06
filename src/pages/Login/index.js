// File Login.js
// import React from 'react'
import { useState } from "react"
import { URL_WEB } from "../../constants"
import axios from 'axios'
import './Login.scss'
import { useNavigate } from "react-router-dom"
// import { EyeOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { message } from 'antd'
import { Input, Space } from 'antd'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    //   const [passwordVisible, setPasswordVisible] = React.useState(false);
    const navigate = useNavigate()

    const HandleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e)
        // console.log(username)
        // console.log(password)

        try {
            // POST tới Backend
            const response = await axios.post(`${URL_WEB}/auth/login`, {
                username: username,
                password: password,
                role: 'USER'
            })
            // xử lí khi đăng nhập thành công
            // console.log('Đăng nhập thành công', response.data)
            message.success('Đăng nhập thành công')
            console.log("In login user", response.data.data.accessToken)
            localStorage.setItem('token', response.data.data.accessToken)
            // console.log('Data.token:', response.data.result.accessToken)
            navigate('/home')

        }
        catch {
            // console.log('Đăng nhập thất bại')
            message.error('Đăng nhập thất bại')
        }
    }
    const HandleSignin = () => {
        navigate('/signin')
    }
    return (
        <>
            {/* <div className="login-wrapper"></div>  */}
            <div className="login-container">
                <div className="wrapper">
                    <form onSubmit={HandleSubmit} className="login">
                        {/* <div className="login__dangnhap">Login Account</div>
                        <div className="login__name">
                            <input placeholder="Email ID" type="text" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="login__password">
                            <Space >
                                <Input.Password className='ant-input' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Space>
                        </div>
                        <div className="login__signin" onClick={HandleSignin}>
                            Bạn chưa có tài khoản?
                        </div>
                        <div className="login__submit">
                            <button type="submit">Login</button>
                        </div> */}

                        <h1>Login</h1>
                        <div className="input-box">
                            <input placeholder="Email ID" type="text" onChange={(e) => setUsername(e.target.value)} />
                            {/* <i class='bx  bx-stamp'  ></i>  */}
                        </div>

                        <div className="input-box">
                            <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                            {/* <i class='bx  bx-lock'  ></i>  */}
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />Remember me
                            </label>
                            <a href="#">Forgot password</a>
                        </div>

                        <button type="submit" className="btn">Login</button>

                        <div className="register-link">
                            <p>Don't have an account? <a onClick={HandleSignin}>Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login