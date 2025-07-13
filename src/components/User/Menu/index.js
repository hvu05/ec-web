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

    return (
        <>
            <Row className='menu'>
                <Col span={4}></Col>
                <Col span={2}>
                    <div className='menu__logo' onClick={() => { navigate('/home') }}>
                        <img src='https://t4.ftcdn.net/jpg/03/31/93/85/360_F_331938599_nmkc39B7E74s1G5P01b0YCJ6x0MNMqJz.jpg' alt='logo' />
                    </div>
                </Col>
                <Col span={2}>
                    {/* <i className="fa-solid fa-right-from-bracket menu__icon--logout"></i> */}
                    <div className='menu__danhmuc'>Category</div>
                </Col>
                <Col span={8}>
                    <div className='menu__search'>
                        <input
                            placeholder='Search'
                            onKeyDown={onSearch}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </Col>
                <Col span={2}>
                    <div className='menu__cart' onClick={() => { navigate("/cart") }}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <div className='menu__cart-text'>{cartCount}</div>
                    </div>
                </Col>
                <Col span={2}>
                    <div className='menu__account'>
                        <div class="dropdown">
                            <button><i class="fa-solid fa-user"></i></button>
                            <div class="content">
                                <a onClick={() => { navigate('/user', {state: {mess: 'information'}}) }}><i class="fa-solid fa-user" style={{ paddingRight: '10px' }}></i> Personal Information</a>
                                <a onClick={() => { navigate('/user', {state: {mess: 'orders'}}) }}><i class="fa-solid fa-truck-fast" style={{ paddingRight: '10px' }}></i> My Orders</a>
                                <a onClick={() => { navigate('/user', {state: {mess: 'addresses'}}) }}><i class="fa-solid fa-location-dot" style={{ paddingRight: '10px' }}></i> Shipping Addresses</a>
                                <a onClick={() => { navigate('/')}}><i class="fa-solid fa-right-from-bracket" style={{ paddingRight: '10px' }}></i>  Log Out</a>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={4}></Col>
            </Row>


        </>
    )
}
export default MenuProduct