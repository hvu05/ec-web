import axios from "axios"
import { useState } from "react"
import { URL_WEB } from "../../constants"
import { useNavigate } from "react-router-dom"
import { message } from "antd"

function Admin() {
    const [showform, setShowform] = useState(false)
    const [dataForm, setDataForm] = useState({ name: '', description: '' })
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const HandleChange = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    const HandleAddProduct = async (e) => {
        e.preventDefault()

        if (!token) {
            console.log('Error: No token found')
            return
        }

        setLoading(true)
        console.log('Sending data:', dataForm)
        
        try {
            const res = await axios.post(`${URL_WEB}/category`, {
                name: dataForm.name.toString(),  // Use form data instead of hardcoded values
                description: dataForm.description.toString()
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            
            console.log('Success Response:', res.data)
            
            // Reset form after successful submission
            setDataForm({ name: '', description: '' })
            setShowform(false)
            
        } catch (error) {
            console.log('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers
            })
            
            // Handle specific error cases
            if (error.response?.status === 401) {
                message.error('Authentication failed - token may be invalid')
                // Optionally redirect to login
            } else if (error.response?.status === 403) {
                message.error('Permission denied')
            } else if (error.response?.status === 400) {
                message.error('Bad request - check your data format')
            }
        } finally {
            setLoading(false)
        }
    }

    const LoginAdmin = () => {
        navigate('/admin')
    }

    return (
        <>
            <button onClick={LoginAdmin}>Log in ADMIN</button>
            <button onClick={() => setShowform(true)}>Add Product</button>
            <button onClick={() => setShowform(false)}>Hide Form</button>
            
            {showform && (
                <form onSubmit={HandleAddProduct}>
                    <input
                        name="name"
                        type="text"  // Use "text" instead of "string"
                        placeholder="Input name product"
                        value={dataForm.name}
                        onChange={HandleChange}
                        required
                    />
                    <input
                        name="description"
                        type="text"  // Use "text" instead of "string"
                        placeholder="Input description"
                        value={dataForm.description}
                        onChange={HandleChange}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            )}
        </>
    )
}

export default Admin