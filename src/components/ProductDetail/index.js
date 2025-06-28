import { useLocation } from "react-router-dom" 
import { useState } from "react" 
import './ProductDetail.scss' 
import BackButton from "../Back" 
import MenuProduct from "../Menu" 
import { increment } from "../../redux/cartSlice" 
import { URL_WEB } from "../../constants" 
import axios from "axios" 
import { message } from "antd" 
import { useDispatch } from "react-redux" 

function ProductDetail() {
    const dispatch = useDispatch()
    const location = useLocation()
    const product = location.state || {} 
    const prd = product.products || {} 
    const [selectedDetail, setSelectedDetail] = useState(prd.productDetail?.[0] || null)
    const [quantity, setQuantity] = useState(0)

    const name = prd.name || "Product Name" 
    const description = prd.description || "No description available" 
    const imageUrl = prd.imageUrl || "https://via.placeholder.com/300" 
    const averageRate = prd.averageRate || 0 
    const productDetail = prd.productDetail || [] 

    const HandleAddCart = (item) => {
        // console.log(item)
        const token = localStorage.getItem('token') 
        const productId = prd.id 
        const detailId = item?.id || productId 

        axios.post(`${URL_WEB}/cart-item`, {
            productId: productId,
            num: quantity,
            detailId: detailId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                message.success("Đã thêm vào giỏ hàng!")
                dispatch(increment())
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    message.error("Bạn cần đăng nhập để thêm sản phẩm.") 
                } else {
                    message.error("Thêm vào giỏ hàng thất bại.") 
                    console.error(err) 
                }
            }) 
    } 

    const handleBuyNow = (item) => {
        // Placeholder for Buy Now functionality
        message.info("Chức năng mua ngay đang được phát triển!") 
    } 

    const handleSelectVariant = (detail) => {
        setSelectedDetail(detail) 
    } 

    const HandleChangeQuantity = (e) => {
        setQuantity(e.target.value)
        // console.log(quantity)
    }
    return (
        <>
            <MenuProduct />
            <div className="space"></div>
                <BackButton />
            <div className="product-detail">
                <h2 className="product-detail__heading">{name}</h2>

                <div className="product-detail__container">
                    <div className="product-detail__image-container">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="product-detail__image"
                        />
                    </div>
                    <div className="product-detail__info-container">
                        <p><strong>Mô tả:</strong> {description}</p>
                        <p><strong>Đánh giá:</strong> ⭐ {averageRate}/5</p>
                        <h3 className="product-detail__subheading">Chọn phiên bản</h3>
                        <div className="product-detail__variants">
                            {productDetail.map((detail) => (
                                <button
                                    key={detail.id}
                                    className={`variant-button ${selectedDetail?.id === detail.id ? 'selected' : ''}`}
                                    onClick={() => handleSelectVariant(detail)}
                                >
                                    {detail.info}
                                </button>
                            ))}
                        </div>
                        {selectedDetail && (
                            <div className="product-detail__price">
                                <p><strong>Giá:</strong> ${selectedDetail.price}</p>
                                <p><strong>Số lượng còn lại:</strong> {selectedDetail.quantity}</p>
                                <label for='quantity'>Số lượng mua</label>
                                <input type="number" id="quantity" min='1' max={selectedDetail.quantity} value={quantity} onChange={HandleChangeQuantity}/>
                            </div>
                        )}
                        <div className="product-detail__actions">
                            <button
                                className="add-to-cart"
                                onClick={() => HandleAddCart(selectedDetail)}
                                disabled={!selectedDetail}
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <button
                                className="buy-now"
                                onClick={() => handleBuyNow(selectedDetail)}
                                disabled={!selectedDetail}
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) 
}

export default ProductDetail 