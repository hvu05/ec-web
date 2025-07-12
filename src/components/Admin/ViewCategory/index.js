import axios from "axios"
import { URL_WEB } from "../../../constants"
import { useEffect, useState } from "react"
import UploadImage from "../../UploadImage"
import { useLocation, useNavigate } from "react-router-dom"
import './ViewCategory.scss'
import { message } from "antd"

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
    const HandleGetProductById = async () => {
        try {
            const response = await axios.get(`${URL_WEB}/product`, {
                headers: {Authorization: `Bearer ${token}`},
                params: {}
            })
            // console.log('Res at HandleGetProductById', response.data.data)
            const listProduct = response.data.data
            const filteredProducts = listProduct.filter(product =>
                Array.isArray(product.category) && product.category.includes(name)
            )   
            // console.log('da loc', filteredProducts)
            setListProd(filteredProducts)
        } catch (err) {
            // console.log('Error at HandleGetProductById', err)
            message.error('Error at HandleGetProductById')
        }
    }
    useEffect(() => {
        const TempFunc = async() => {
            await HandleGetProductById()
        }
        TempFunc()
    }, [])

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
            // console.log("Submitting product:", product)

            const response = await axios.post(`${URL_WEB}/product`, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            // console.log('✅ Response from API:', response)

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
            // console.log('err delete')
        }
    }

    const HandleAddDetail = (item) => {
        // console.log('item in view cat', item)
        navigate(`/admin-home/${item.name}/${item.id}`, {
            state: {
                id: item.id
            }
        })
    }
    return (
        <div className="view-category">
            <div className="view-category__container">
                <h1 className="view-category__title">{nameS}</h1>
                
                <div className="view-category__info-section">
                    <div className="view-category__info-header">
                        <h3 className="info-title">Category Information</h3>
                        <button className="close-btn" onClick={() => navigate(-1)}>✕</button>
                    </div>

                    <div className="view-category__info-content">
                        <div className="info-text">
                            <p><strong>ID:</strong> {idS}</p>
                            <p><strong>Name:</strong> {nameS}</p>
                            <p><strong>Description:</strong> {descriptionS}</p>
                        </div>

                        {urlImage && (
                            <img src={urlImageS} alt="Category" className="category-image" />
                        )}
                    </div>

                    <div className="view-category__info-actions">
                        <button className="view-category__btn view-category__btn--accent" onClick={() => setShowAdd(true)}>
                            + Add Product
                        </button>
                        <button className="view-category__btn view-category__btn--primary" onClick={HandleGetProductById}>
                            View Products
                        </button>
                        <button className="view-category__btn view-category__btn--danger" onClick={HandleDeleteProduct}>
                            Delete Category
                        </button>
                    </div>
                </div>

                <div className="view-category__product-list">
                    {listProd && listProd.map((product, index) => (
                        <div key={index} className="view-category__product-card">
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <div className="product-info">
                                <p><strong>ID:</strong> {product.id}</p>
                                <p><strong>Description:</strong> {product.description}</p>
                                <p><strong>Brand:</strong> {product.brand || 'N/A'}</p>
                                <p><strong>Category:</strong> {Array.isArray(product.category) ? product.category.join(', ') : 'None'}</p>
                                <p><strong>Average Rate:</strong> {product.averageRate}</p>
                            </div>

                            <div className="product-actions">
                                <button 
                                    className="action-btn action-btn--delete" 
                                    onClick={() => HandleDeleteProduct(product.id)}
                                >
                                    Delete
                                </button>
                                <button 
                                    className="action-btn action-btn--add" 
                                    onClick={() => HandleAddDetail(product)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showAdd && (
                    <div className="view-category__modal-overlay">
                        <div className="view-category__modal">
                            <button 
                                type="button"
                                className="view-category__close-btn" 
                                onClick={() => setShowAdd(false)}
                            >
                                ✕
                            </button>
                            
                            <form onSubmit={HandleSubmit} className="view-category__form">
                                <div className="form-header">
                                    <h3>Add New Product</h3>
                                    <p>Fill in the details below to create a new product</p>
                                </div>

                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input
                                        placeholder="Enter product name"
                                        value={nameProduct}
                                        onChange={(e) => setNameProduct(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        placeholder="Enter product description"
                                        value={descriptionProduct}
                                        onChange={(e) => setDescriptionProduct(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="optional">Brand</label>
                                    <input
                                        placeholder="Enter brand name"
                                        value={BrandProduct}
                                        onChange={(e) => setBrandProduct(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Product Image</label>
                                    <div className="upload-section">
                                        <div className="upload-icon">📷</div>
                                        <div className="upload-text">Upload product image</div>
                                        <UploadImage
                                            ownerType="CATEGORY"
                                            ownerId={id}
                                            onUploaded={handleImageUploaded}
                                        />
                                    </div>
                                    <input
                                        disabled
                                        placeholder="Image URL will appear here after upload"
                                        value={imageUrlProduct}
                                        onChange={(e) => setImageUrlProduct(e.target.value)}
                                        style={{ marginTop: '10px' }}
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="submit">Save Product</button>
                                    <button type="button" onClick={() => setShowAdd(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ViewCategory