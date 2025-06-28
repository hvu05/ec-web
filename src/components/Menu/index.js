import { useState } from 'react';
import './Menu.scss'
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MenuProduct() {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const token = localStorage.getItem('token') // Kiểm tra xem có đăng nhập chưa để hiển thị (Đăng nhập) hoặc (Đã đăng nhập) ở thanh account
    const cartCount = useSelector((state) => state.cart.count)
    const onSearch = (e) => { /// Khi ấn Enter thì tự động search
        if (e.key === 'Enter') console.log("SEARCH:", search);
    }
    const HandleClickCart = () => {
        navigate("/cart")
    }
    const HandleLogout = () => {
        navigate('/')
    }
    const HandleClickLogo = () => {
        navigate('/home')
    }
    return (
        <>
            <Row className='menu'>
                <Col span={4} onClick={HandleLogout}>
                    <i className="fa-solid fa-right-from-bracket menu__logout"></i>
                </Col>
                <Col span={4}>
                    <div className='menu__logo' onClick={HandleClickLogo}>
                        <img src='/logo.png' alt='logo' />
                    </div>
                </Col>
                <Col span={8}>
                    <div className='menu__search'>
                        <input placeholder='Search' onKeyDown={onSearch} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </Col>
                <Col span={3}>
                    <div className='menu__cart'>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <div className='menu__cart__content' onClick={HandleClickCart}>Giỏ hàng {cartCount}</div>
                    </div>
                </Col>
                <Col span={3}>
                    <div className='menu__account'>
                        <i className="fa-solid fa-circle-user"></i>
                        <div className='menu__cart__content'>{token ? "Đã đăng nhập" : "Chưa đăng nhập"}</div>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default MenuProduct