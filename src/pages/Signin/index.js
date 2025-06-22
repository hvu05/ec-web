import './Signin.scss'
import { useState } from "react"
import { URL_WEB } from "../../constants"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { message } from 'antd'

function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    
    const navigate = useNavigate()

    const HandleSubmit = async (e) => {
        e.preventDefault() // Ngắn chặn auto load lại trang khi Click button
        console.log(e)
        console.log(username)
        console.log(dob)

        try {
            // POST tới Backend
            const response = await axios.post(`${URL_WEB}/user`, {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                dob: dob
            })
            // xử lí khi đăng nhập thành công
            console.log('Đăng ký thành công', response.data)
            message.success('Đăng ký tài khoản thành công')
            navigate('/') // Khi đăng kí thành công thì chuyển đến trang đăng nhập
        }
        catch {
            console.log('Đăng ký thất bại')
            message.error('Đăng ký thất bại')
        }
    }
    const Handlesignin = () => {
        navigate('/')
    }
    return (
        <>
            <div className="signin-wrapper">
                <form onSubmit={HandleSubmit} className="signin">
                    <div className="signin__dangnhap">Đăng ký</div>
                    <div className="signin__password">
                        <input placeholder="Tên đăng nhập" type="text" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="signin__password">
                        <input placeholder="Mật khẩu" type="text" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="signin__password">
                        <input placeholder="Họ" type="text" onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="signin__password">
                        <input placeholder="Tên" type="text" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="signin__password">
                        <input placeholder="Ngày tháng năm sinh" type="date" onChange={(e) => setDob(e.target.value)} />
                    </div>
                    <div className="signin__signin" onClick={Handlesignin}>
                        Quay lại đăng nhập
                    </div>
                    <div className="signin__submit">
                        <button type="submit">Đăng ký</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Signin