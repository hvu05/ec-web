import CircularGallery from "../../components/CircularGallery"
import MenuProduct from "../../components/Menu"
import useFetchAPIProduct from "../../func/fetchAPI/useFetchAPIProduct"
import './Home.scss'
import Skeleton from 'react-loading-skeleton'
import axios from "axios"
import { message } from "antd"
// import { useNavigate } from "react-router-dom"
// lib for Redux
import { useDispatch } from "react-redux"
import { increment } from "../../redux/cartSlice"
import { URL_WEB } from "../../constants"
// END lib for Redux

function Home() {
    const { product, loading } = useFetchAPIProduct()
    const token = localStorage.getItem('token') //Lấy token từ local để kiểm tra tính hợp lệ có việc thêm vào giỏ hàng
    // const navigate = useNavigate()
    const dispatch = useDispatch() // dispatch for Redux

    // if (!token) { //!Chỗ này đến khi có token thật thì active
    //     message.warning("Bạn cần đăng nhập.")
    //     navigate("/")
    //     return
    // }

    // !Set đại 1 token để test khi BE chưa hoàn thiện
    const SetOrRemoveToken = (boolean) => {
        if(boolean) localStorage.setItem('token', "KDIFKDKK")
        else localStorage.removeItem('token')
    }
    // ! END set token

    const HandleAddCart = (item) => {
        const productId = item.result[0].productDetail[0].id
        axios.post(`${URL_WEB}/cart-item`, {
            product_id: productId, // Gửi data đến BE theo format để xử lí
            num: 1
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        /* 
        *headers: là thuộc tính trong config object của axios để gửi thêm thông tin header.
        *Authorization: là tên chuẩn của header chứa thông tin xác thực.
        *`Bearer ${token}`: là template string trong JavaScript, dùng để nối "Bearer " với giá trị token động (biến token).
        */
            .then(() => { // Thông báo khi thêm thành công
                message.success("Đã thêm vào giỏ hàng!");
                // Optional: cập nhật số lượng giỏ hàng hiển thị
                dispatch(increment()) // Tăng số lượng trong giỏ hàng (Redux)

            })
            .catch((err) => { // Nếu lỗi, tức 401 thì thông báo lỗi
                if (err.response?.status === 401) {
                    message.error("Bạn cần đăng nhập để thêm sản phẩm.");
                } else {
                    message.error("Thêm vào giỏ hàng thất bại.");
                }
            })
    }
    return (
        <>
            <MenuProduct />
            <div className="sanpham">
                SẢN PHẨM NỔI BẬT
            </div>
            <div onClick={() => SetOrRemoveToken(true)}>button set token</div>
            <div onClick={() => SetOrRemoveToken(false)}>remove token</div>
            <CircularGallery />

            <div className="sanpham">
                DANH SÁCH SẢN PHẨM
            </div>

            {loading ? (
                <div className="product__list" >
                    <div className="product__item">
                        <Skeleton className="product__image" />
                        <Skeleton className="product__name" />
                        <Skeleton className="product__price" />
                    </div>
                </div>) : (
                <div className="product__list" >
                    {product.map((item, index) => (
                        <div key={index} className="product__item">
                            <img className="product__image" src={item.result[0].imageUrl} alt={item.result[0].name}/>
                            <h1 className="product__name" >{item.result[0].name}</h1>
                            <span className="product__price">{item.result[0].productDetail[0].price}VND</span>
                            <span className="cart" onClick={() => HandleAddCart(item)}>Thêm giỏ hàng</span>
                        </div>
                    ))}
                </div>
            )}

        </>
    )
}
export default Home