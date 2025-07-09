import axios from "axios"
import { useState } from "react"
import { URL_WEB } from "../../constants"
import { useNavigate } from "react-router-dom"
import { message } from "antd"
import ListCategory from "../../components/ListCategory"
import './Admin.scss'

function Admin() {
    const [showform, setShowform] = useState(false)
    const [dataForm, setDataForm] = useState({ name: '', description: '', url: '' })
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const HandleChange = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    const HandleAddProduct = async (e) => {
        e.preventDefault()

        if (!token) {
            // console.log('Error: No token found')
            return
        }

        setLoading(true)
        // console.log('Sending data:', dataForm)
        
        try {
            const res = await axios.post(`${URL_WEB}/category`, {
                name: dataForm.name.toString(),
                description: dataForm.description.toString(),
                urlImage: dataForm.url.toString()
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            
            // console.log('Success Response:', res.data)
            
            // Reset form after successful submission
            setDataForm({ name: '', description: '', url: '' })
            setShowform(false)
            message.success('Category added successfully!')
            
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
            } else if (error.response?.status === 403) {
                message.error('Permission denied')
            } else if (error.response?.status === 400) {
                message.error('Bad request - check your data format')
            } else {
                message.error('An error occurred while adding category')
            }
        } finally {
            setLoading(false)
        }
    }

    const LoginAdmin = () => {
        navigate('/admin')
    }

    return (
        <div className="admin-page">
            <div className="admin-page__container">
                <div className="admin-page__header">
                    <h1>Admin Dashboard</h1>
                    <p>Manage your products and categories with ease</p>
                </div>
                
                <div className="admin-page__controls">
                    <button 
                        onClick={() => setShowform(true)} 
                        className="admin-page__btn admin-page__btn--accent"
                    >
                        Add Category
                    </button>
                </div>
                
                {showform && (
                    <div className="admin-page__form-overlay" onClick={() => setShowform(false)}>
                        <div className="admin-page__form-modal" onClick={(e) => e.stopPropagation()}>
                            <button 
                                className="admin-page__close-btn"
                                onClick={() => setShowform(false)}
                            >
                                ×
                            </button>
                            
                            <form className="admin-page__form" onSubmit={HandleAddProduct}>
                                <div className="form-header">
                                    <h3>Add New Category</h3>
                                    <p>Fill in the details below to create a new category</p>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="name">Category Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter category name"
                                        value={dataForm.name}
                                        onChange={HandleChange}
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Enter category description"
                                        value={dataForm.description}
                                        onChange={HandleChange}
                                        rows="3"
                                        required
                                    />
                                </div>
                                
                                {/* <div className="form-group">
                                    <label htmlFor="url">Image URL (Optional)</label>
                                    <input
                                        id="url"
                                        name="url"
                                        type="text"
                                        placeholder="Enter image URL"
                                        value={dataForm.url}
                                        onChange={HandleChange}
                                    />
                                </div> */}
                                
                                <div className="form-actions">
                                    <button 
                                        type="button" 
                                        onClick={() => setShowform(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                    >
                                        {loading ? 'Adding...' : 'Add Category'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                
                <div className="admin-page__content">
                    <ListCategory />
                </div>
            </div>
        </div>
    )
}

export default Admin