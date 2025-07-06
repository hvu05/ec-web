// file: ListCategory
import { useEffect, useState } from "react"
import useFetchAPICategory from "../../func/fetchAPI/useFetchAPICategory"
import './ListCategory.scss'
import axios from "axios"
import { URL_WEB } from "../../constants"
import EditCategory from "../EditCategory"
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
        <div className="list-category">
            <div className="list-category__container">
                <div className="list-category__header">
                    <h2>    </h2>
                    <p>Browse through our product categories</p>
                </div>

                {loading ? (
                    <div className="list-category__loading">
                        <div className="loading-spinner"></div>
                        <p>Loading categories...</p>
                    </div>
                ) : (
                    listCate && listCate.length ? (
                        <div className="list-category__grid">
                            {listCate.map((item, index) => (
                                <div key={index} className="list-category__card">
                                    <img src={item.urlImage} alt={item.name} className="category-image" />
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
                                        <button className="action-btn view-btn" onClick={() => HandleViewCategory(item)}>View</button>
                                        {/* <button className="action-btn add-btn" onClick={() => HandleAddCategory(item)}>+</button> */}
                                        <button className="action-btn edit-btn" onClick={() => HandleEditCategory(item)}>Edit</button>
                                        <button className="action-btn delete-btn" onClick={() => HandleDeleteCategory(item.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="list-category__empty">
                            <div className="empty-icon">📂</div>
                            <h3>No Categories Found</h3>
                            <p>There are no categories available at the moment.</p>
                        </div>
                    )
                )}
            </div>
            
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