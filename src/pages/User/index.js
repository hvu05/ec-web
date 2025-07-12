import { useEffect, useState } from "react"
import BackButton from "../../components/Back"
import axios from "axios"
import { URL_WEB } from "../../constants"
import Address from "../../components/User/Address"
import GetAddress from "../../components/User/Address/GetAddress"
import './User.scss'
import MenuProduct from "../../components/User/Menu"

function User() {
    const [user, setUser] = useState(null)
    const token = localStorage.getItem('token')
    // const [showAddress, setShowAddress] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${URL_WEB}/user/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log('res user', response)
                setUser(response.data.data)
            } catch {
                console.log('err at User')
            }
        }
        getUser()
    }, [])
    const HandleShowProvince = async () => {
        try {
            const response = await axios.get(`${URL_WEB}/address/province`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('res in show privince', response)
        } catch {
            console.log('error res in show privince')

        }
    }
    return (
        <div className="user">
            <MenuProduct />
            {/* <BackButton /> */}
            <div className="user__info-container">
                <div className="user__dash">User Dashboard</div>
                <div className="user__table">
                    {user && (
                        <table className="user__info">
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <td>{user.firstName}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{user.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>{user.role}</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>{new Date(user.dob).toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {/* <button onClick={() => {setShowAddress(!showAddress)}}>{showAddress ? 'Close form': 'Open form'}</button> */}
            {user && <GetAddress userId={user.id} />}
            {user && <Address userId={user.id} />}
        </div>
    )
}
export default User