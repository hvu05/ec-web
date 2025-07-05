import axios from "axios"
import { URL_WEB } from "../../constants"
import { useEffect, useState } from "react"
import UploadImage from "../UploadImage"
import { useLocation, useNavigate } from "react-router-dom"
import './ViewCategory.scss'

function ViewCategory() {
    const navigate = useNavigate()
    const location = useLocation()
    const { id, name, description, urlImage } = location.state || {}

    const [idS, setID] = useState(id)
    const [nameS, setName] = useState(name)
    const [descriptionS, setDescription] = useState(description)
    const [urlImageS, setUrlImage] = useState(urlImage)

    //-------- for product-----------
    const [nameProduct, setNameProduct] = useState('')
    const [imageUrlProduct, setImageUrlProduct] = useState('')
    const [descriptionProduct, setDescriptionProduct] = useState('')
    const [BrandProduct, setBrandProduct] = useState('')
    //-------- END for product ----------

    const [category, setCategory] = useState(null)
    const [listProd, setListProd] = useState(null)

    const token = localStorage.getItem('token')
    const [showAdd, setShowAdd] = useState(false)
    // console.log('id', props.id)

    useEffect(() => {
        setID(id)
        setName(name)
        setDescription(description)
        setUrlImage(urlImage)

    }, [id, name, description, urlImage])

    const HandleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.BrandProduct)
        const product = {
            name: nameProduct,
            description: descriptionProduct,
            imageUrl: imageUrlProduct,
            brand: BrandProduct,
            productDetails: [],
            productCategory: [name]
        }
        try {
            console.log("Submitting product:", product)

            const response = await axios.post(`${URL_WEB}/product`, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            console.log('✅ Response from API:', response)

            // Reset form
            setNameProduct('')
            setDescriptionProduct('')
            setImageUrlProduct('')
            setBrandProduct('')
            setShowAdd(false)

            // Refresh list
            await HandleGetProductById()

        } catch (err) {
            console.error('Error in HandleSubmit:', err)
            if (err.response) {
                console.error('API responded with:', err.response.data)
            }
        }

    }
    const handleImageUploaded = (newUrl) => {
        setImageUrlProduct(newUrl)
    }
    
    const HandleDeleteProduct = async (ID) => {
        try {
            await axios.delete(`${URL_WEB}/product/${ID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await HandleGetProductById()
        }
        catch {
            console.log('err delete')
        }
    }
    const HandleGetProductById = async () => {
        try {
            const response = await axios.get(`${URL_WEB}/product`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {

                }
            })
            console.log('Res at HandleGetProductById', response.data.data)
            const listProduct = response.data.data
            const filteredProducts = listProduct.filter(product =>
                Array.isArray(product.category) && product.category.includes(name)
            )
            console.log('da loc', filteredProducts)
            setListProd(filteredProducts)
        } catch (err) {
            console.log('Error at HandleGetProductById', err)
        }
    }
    const HandleAddDetail = (item) => {
        navigate(`/admin-home/${item.name}/${item.id}`, {
            state: {
                id: item.id
            }
        })
    }
    return (
        <div className="view-category">
            <h2 className="vc-title">{nameS}</h2>
            {1 ? (
                <div className="vc-info-section">
                    <div className="vc-info-header">
                        <h3 className="vc-info-title">Thông tin Danh mục</h3>
                        <button className="vc-btn vc-btn-back" onClick={() => navigate(-1)}>✕</button>
                    </div>

                    <div className="vc-info-content">
                        <div className="vc-info-text">
                            <p><b>ID:</b> {idS}</p>
                            <p><b>Name:</b> {nameS}</p>
                            <p><b>Description:</b> {descriptionS}</p>
                        </div>

                        {urlImage && (
                            <img src={urlImageS} alt="Category" className="vc-image" />
                        )}
                    </div>

                    <div className="vc-info-actions">
                        <button className="vc-btn vc-btn-accent" onClick={() => setShowAdd(true)}>+ Thêm sản phẩm</button>
                        <button className="vc-btn vc-btn-primary" onClick={HandleGetProductById}>Xem sản phẩm</button>
                        <button className="vc-btn vc-btn-delete" onClick={HandleDeleteProduct}>Xóa sản phẩm</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <div className="vc-product-list">
                {listProd && listProd.map((product, index) => (
                    <div key={index} className="vc-product-card">
                        <img src={product.imageUrl} alt={product.name} className="vc-product-img" />
                        <h3 className="vc-product-name">{product.name}</h3>
                        <p><b>ID:</b> {product.id}</p>
                        <p><b>Description:</b> {product.description}</p>
                        <p><b>Brand:</b> {product.brand || 'N/A'}</p>
                        <p><b>Category:</b> {Array.isArray(product.category) ? product.category.join(', ') : 'None'}</p>
                        <p><b>Average Rate:</b> {product.averageRate}</p>

                        <button className="vc-btn-delete vc-btn" onClick={() => HandleDeleteProduct(product.id)}>Xóa</button>
                        <button className="vc-btn-add" onClick={() => HandleAddDetail(product)}>+</button>
                    </div>
                ))}
            </div>

            {showAdd && (
                <div className="modal-overlay">
                    <div className="modal">
                        <form onSubmit={HandleSubmit} className="vc-form">
                            <label className="vc-label">Product Name</label>
                            <input
                                className="vc-input"
                                placeholder="Enter product name"
                                value={nameProduct}
                                onChange={(e) => setNameProduct(e.target.value)}
                            />

                            <label className="vc-label">Image URL</label>
                            <input
                                className="vc-input"
                                placeholder="Enter image URL"
                                value={imageUrlProduct}
                                onChange={(e) => setImageUrlProduct(e.target.value)}
                            />

                            <label className="vc-label">Description</label>
                            <input
                                className="vc-input"
                                placeholder="Enter description"
                                value={descriptionProduct}
                                onChange={(e) => setDescriptionProduct(e.target.value)}
                            />

                            <label className="vc-label">Brand</label>
                            <input
                                className="vc-input"
                                placeholder="Enter brand"
                                value={BrandProduct}
                                onChange={(e) => setBrandProduct(e.target.value)}
                            />

                            <UploadImage
                                ownerType="CATEGORY"
                                ownerId={id}
                                onUploaded={handleImageUploaded}
                            />

                            <button className="vc-btn vc-btn-submit" type="submit" >Submit</button>
                            <button className="vc-btn" onClick={() => setShowAdd(false)}>Hủy</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ViewCategory