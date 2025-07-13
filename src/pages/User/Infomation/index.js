import axios from "axios"
import { useEffect, useState } from "react"
import { URL_WEB } from "../../../constants"
import { message } from "antd"
import './Infomation.scss'
import { useLocation } from "react-router-dom"

function Information(props) {
    const location = useLocation()
    
    const user = props.users
    const token = localStorage.getItem('token')
    const [showEdit, setShowEdit] = useState(false) // If show: True -> show form edit, else: show == false -> show information

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dob, setDob] = useState("")

    useEffect(() => {
        setUsername(user.username)
        setPassword(user.password)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        if (user.dob) {
            const date = new Date(user.dob);
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            setDob(`${yyyy}-${mm}-${dd}`);
        } else {
            setDob("");
        }
    }, [user])
    const HandleEditInfo = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${URL_WEB}/user/${user.id}`, {
                firstName, lastName, dob
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch {
            message.error('error at Edit Information')
        }
    }
    return (
        <>
            {user && !showEdit && <>
                <h2>Personal Information</h2>
                <table className="user-info">
                    <tbody>
                        <tr><td>Full Name</td><td className="field">{user.firstName} {user.lastName}</td></tr>
                        <tr><td>Phone</td><td className="field">{user.username}</td></tr>
                        <tr><td>Gender</td><td className="field">{user.gender || 'Male'}</td></tr>
                        <tr><td>Date of Birth</td><td className="field">{new Date(user.dob).toLocaleDateString()}</td></tr>
                        <tr><td>Role</td><td className="field">{user.id}</td></tr>
                    </tbody>
                </table>
            </>}

            {
                user && showEdit && <div >
                    <h2>Edit Personal Information</h2>
                    <div className="edit-container">
                        <form onSubmit={HandleEditInfo} className="user-edit">
                            {/* <div >
                            <input
                                placeholder={username}
                                value={username}
                                type="text"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div> */}

                            {/* <div >
                            <input
                                value={password}
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div> */}

                            <div >
                                <input
                                    className="field-edit"
                                    value={firstName}
                                    placeholder="First name"
                                    type="text"
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div >
                                <input
                                    className="field-edit"
                                    value={lastName}
                                    placeholder="Last name"
                                    type="text"
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div >
                                <input
                                    className="field-edit"
                                    value={dob}
                                    placeholder="BOD"
                                    type="date"
                                    required
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn--primary">Save</button>
                        </form>
                    </div>
                </div>
            }
            {<button className="btn btn--primary" onClick={() => setShowEdit(true)}>Edit Information</button>}
        </>
    )
}
export default Information