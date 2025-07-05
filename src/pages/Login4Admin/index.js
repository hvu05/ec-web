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
            message.success('Đăng nhập thành côngggggg')
            console.log('Token when login', response.data.data.accessToken)
            // console.log('ROLE:', response)
            localStorage.setItem('token', response.data.data.accessToken)
            navigate('/admin-home')
        }
        catch(e) {
            console.log('Đăng nhập thất bại', e)
            message.error('Đăng nhập thất bạiiiiiii')
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
                        <button type="button" style={{marginLeft: 20 }} onClick={HandleUser}>Người dùng</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login4Admin