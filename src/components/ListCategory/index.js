// file: ListCategory
import { useEffect, useState } from "react"
import useFetchAPICategory from "../../func/fetchAPI/useFetchAPICategory"
import './ListCategory.scss'
import axios from "axios"
import { URL_WEB } from "../../constants"
import EditCategory from "../EditCategory"
import ViewCategory from "../ViewCategory"
import { useNavigate } from "react-router-dom"

function ListCategory() {
    const { category, loading } = useFetchAPICategory()
    const [listCate, setListCate] = useState(null)
    const [editCate, setEditCate] = useState({ id: '', name: '', description: '', urlImage: '' })
    const [show, setShow] = useState(false)
    const [showView, setShowView] = useState(false)
    const navigate = useNavigate()
    // console.log('ListCate', category)

    const token = localStorage.getItem('token')

    useEffect(() => {
        setListCate(category)
    }, [category])

    const HandleDeleteCategory = async (id) => {
        // console.log(id)
        // console.log('list', listCate)
        await axios.delete(`${URL_WEB}/category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setListCate(cate => cate.filter(item => item.id !== id))
    }
    const HandleEditCategory = (item) => {
        setEditCate({
            id: item.id,
            name: item.name,
            description: item.description,
            urlImage: item.urlImage
        })
        setShow(true)
    }
    const HandleUpdateCategory = (updatedCategory) => {
        setListCate(prev =>
            prev.map(item =>
                item.id === updatedCategory.id ? updatedCategory : item
            )
        )
    }
    const HandleViewCategory = (cate) => {
        navigate(`/admin-home/${cate.name}`, {
            state: {
                id: cate.id,
                name: cate.name,
                description: cate.description,
                urlImage: cate.urlImage
            }
        })
    }
    const HandleAddCategory = (item) => {
        setEditCate({
            id: item.id,
            name: item.name,
            description: item.description,
            urlImage: item.urlImage
        })
        setShowView(true)
    }
    return (
        <div className="category-container">
            {/* {console.log(listCate)} */}
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
                listCate && listCate.length ? (
                    <div className="category-grid">
                        {listCate.map((item, index) => (
                            <div key={index} className="category-card">
                                <div className="category-icon">
                                    {/* {console.log('urlimage', item.urlImage)} */}
                                    <img src={item.urlImage} alt={index} />
                                </div>
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
                                    <button className="view-btn" onClick={() => HandleViewCategory(item)}>View</button>
                                    <button className="add-btn" onClick={() => HandleAddCategory(item)}>+</button>
                                    <button className="edit-btn" onClick={() => HandleEditCategory(item)}>Edit</button>
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
            <div>
                {show && <EditCategory
                    id={editCate.id}
                    name={editCate.name}
                    description={editCate.description}
                    urlImage={editCate.urlImage}
                    onClose={() => setShow(false)}
                    onUpdateCategory={HandleUpdateCategory}
                />}
                {/* {console.log('EditcateID', editCate.id)} */}
                {/* {showView && <ViewCategory
                    id={editCate.id}
                    name={editCate.name}
                    description={editCate.description}
                    urlImage={editCate.urlImage} 
                    onClose={() => setShowView(false)}
                    />} */}
            </div>
        </div>
    )
}

export default ListCategory