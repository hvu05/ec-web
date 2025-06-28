// File loginadmin4Admin.js
// import React from 'react'
import { useState } from "react"
import { URL_WEB } from "../../constants"
import axios from 'axios'
import './Login4Admin.scss'
import { useNavigate } from "react-router-dom"
import { message } from 'antd'
import {Input, Space } from 'antd'

function Login4Admin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            // POST tới Backend
            const response = await axios.post(`${URL_WEB}/auth/login`, {
                username: username,
                password: password,
                role: 'ADMIN'
            })
            message.success('Đăng nhập thành công')
            localStorage.setItem('token', response.data.result.accessToken)
            navigate('/admin-home')
        }
        catch {
            // console.log('Đăng nhập thất bại')
            message.error('Đăng nhập thất bại')
        }
    }
    const HandleUser = () => {
        navigate('/')
    }
    return (
        <>
            <div className="loginadmin-wrapper">
                <form onSubmit={HandleSubmit} className="loginadmin">
                    <div className="loginadmin__dangnhap">Đăng nhập cho Admin</div>
                    <div className="loginadmin__name">
                        <input placeholder="Tên đăng nhập" type="text" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="loginadmin__password">
                        <Space >
                            <Input.Password className='ant-input' placeholder="Nhập mật khẩu" onChange={(e) => setPassword(e.target.value)}/>
                        </Space>
                    </div>
                    <div className="loginadmin__submit">
                        <button type="submit">Đăng nhập</button>
                        <button type="submit" style={{marginLeft: 20 }} onClick={HandleUser}>Người dùng</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login4Admin