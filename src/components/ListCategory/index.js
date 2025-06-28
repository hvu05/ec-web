import { useEffect, useState } from "react"
import useFetchAPICategory from "../../func/fetchAPI/useFetchAPICategory"
import './ListCategory.scss'
import axios from "axios"
import {URL_WEB } from "../../constants"
import EditCategory from "../EditCategory"

function ListCategory() {
    const {category, loading} = useFetchAPICategory()
    const [listCate, setListCate] = useState(null)
    const [idC, setIdC] = useState(null)

    const token = localStorage.getItem('token')

    useEffect(() => {
        setListCate(category)
    }, [category])

    const HandleDeleteCategory = async (id) => {
        console.log(id)
        console.log('list', listCate)
        await axios.delete(`${URL_WEB}/category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            setListCate(cate => ({
                ...cate,
                result: cate.result.filter(item => item.id !== id)
            }))
    }
    return (
        <div className="category-container">
            <div className="category-header">
                <h2>Product Categories</h2>
                {/* <p>Browse through our product categories</p> */}
            </div>
            
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading categories...</p>
                </div>
            ) : (
                listCate && listCate.result ? (
                    <div className="category-grid">
                        {listCate.result.map((item, index) => (
                            <div key={index} className="category-card">
                                {/* <div className="category-icon">
                                    <span className="icon">📁</span>
                                </div> */}
                                <div className="category-content">
                                    <h3 className="category-name">{item.name}</h3>
                                    <p className="category-description">
                                        {item.description || 'No description available'}
                                    </p>
                                    <div className="category-id">
                                        <span className="id-label">ID:</span>
                                        <span className="id-value">{item.id}</span>
                                    </div>
                                </div>
                                <div className="category-actions">
                                    <button className="view-btn">View</button>
                                    <button className="edit-btn" onClick={() => setIdC(item.id)}>Edit</button>
                                    <button className="delete-btn" onClick={() => HandleDeleteCategory(item.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📂</div>
                        <h3>No Categories Found</h3>
                        <p>There are no categories available at the moment.</p>
                    </div>
                )
            )}
            <div>{idC && <EditCategory id={idC}/>}</div>
        </div>
    )
}

export default ListCategory