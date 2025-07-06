// File Home.js
import CircularGallery from "../../components/CircularGallery"
import MenuProduct from "../../components/Menu"
import useFetchAPIProduct from "../../func/fetchAPI/useFetchAPIProduct"
import './Home.scss'
import Skeleton from 'react-loading-skeleton'
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
// lib for Redux
// import { useDispatch } from "react-redux"
// END lib for Redux

function Home() {
    const { product, loading } = useFetchAPIProduct()
    const [mouseEnter, setMouseEnter] = useState(null)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    if (!token) {
        message.warning("Bạn cần đăng nhập.")
        navigate("/")
        return
    }
    console.log(product)
    const HandleShowDetail = (item) => {
        navigate('/detail', { state: { products: item } });
    }

    return (
        <div className="home-page">
            <MenuProduct />
            <div className="intro">
                <div className="welcome-section">
                    <h1 className="welcome-title">Welcome to Our Store</h1>
                    <div className="intro-content">
                        <p className="intro-text">
                            Discover amazing products with the best quality and competitive prices. 
                            We offer a wide range of items to meet all your needs.
                        </p>
                        <p className="intro-subtext">
                            Shop with confidence and enjoy our excellent customer service.
                        </p>
                    </div>
                </div>
                {/* <div className="home__highlight-title">SẢN PHẨM NỔI BẬT</div> */}
            </div>

            {/* <CircularGallery /> */}

            {/* <div className="home__list-title">DANH SÁCH SẢN PHẨM</div> */}

            {loading ? (
                <div className="home__products">
                    <div className="product-card">
                        <Skeleton className="product-card__image" />
                        <Skeleton className="product-card__name" />
                        <Skeleton className="product-card__detail" />
                    </div>
                </div>
            ) : (
                // <div className="home__products">
                //     {product.data && product.data.map((item, index) => (
                //         <div key={index} className="product-card">
                //             <img className="product-card__image" src={item.imageUrl} alt={item.name} />
                //             <h1 className="product-card__name">{item.name}</h1>
                //             <span className="product-card__detail" onClick={() => HandleShowDetail(item)}>
                //                 Show detail
                //             </span>
                //         </div>
                //     ))}
                // </div>

                <div className="container">
                    <div className="header">
                        <h2>Products</h2>
                    </div>

                    <div className="products">
                        {product.data && product.data.map((item, index) => (
                            <div 
                                className="product" 
                                key={index} 
                                onMouseEnter={() => setMouseEnter(index)}
                                onMouseLeave={() => setMouseEnter(null)}
                                >
                                <div className="image">
                                    <img src={item.imageUrl} alt="iPhone" />
                                </div>

                                <div className="namePrice">
                                    <div>{item.name}</div>
                                    <span>{item.price}</span>
                                </div>

                                <p>{item.description}</p>

                                <div className="stars">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>

                                <div className="buy">
                                    {mouseEnter === index && <button onClick={() => HandleShowDetail(item)}>Detail</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            )}

        </div>
    )
}
export default Home