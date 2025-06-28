// File Home.js
import CircularGallery from "../../components/CircularGallery"
import MenuProduct from "../../components/Menu"
import useFetchAPIProduct from "../../func/fetchAPI/useFetchAPIProduct"
import './Home.scss'
import Skeleton from 'react-loading-skeleton'
import { message } from "antd"
import { useNavigate } from "react-router-dom"
// lib for Redux
// import { useDispatch } from "react-redux"
// END lib for Redux

function Home() {
    const { product, loading } = useFetchAPIProduct()
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    if (!token) {
        message.warning("Bạn cần đăng nhập.")
        navigate("/")
        return
    }

    const HandleShowDetail = (item) => {
        navigate('/detail', { state: { products: item } });
    }

    return (
        <>
            <MenuProduct />
            <div className="sanphamnoibat">
                SẢN PHẨM NỔI BẬT
            </div>
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
                    {console.log("Product nhe:", product.result)}
                    {product.result ? (product.result.map((item, index) => (
                        <div key={index} className="product__item">
                            <img className="product__image" src={item.imageUrl} alt={item.name} />
                            <h1 className="product__name" >{item.name}</h1>
                            <span className="cart" onClick={() => HandleShowDetail(item)}>Show detail</span>
                        </div>
                    ))) : (<>Loading...</>)}
                </div>
            )}
        </>
    )
}
export default Home