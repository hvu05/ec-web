// File Cart.js
import axios from 'axios'
import BackButton from '../../components/Back'
import MenuProduct from '../../components/Menu'
import useFetchAPIcart from '../../func/fetchAPI/useFetchAPICart'
import './Cart.scss'
import { URL_WEB } from '../../constants'
import { useEffect, useState } from 'react'
import { message } from 'antd'

function Cart() {
    const { cart, loading } = useFetchAPIcart()
    const [cartList, setCartList] = useState(null)
   
    const token = localStorage.getItem('token')
    console.log('cart', cart)

    useEffect(() => {
        if (cart) {
            setCartList(cart.data)
        }
    }, [cart])
    
    if (loading) {
        return (
            <div className="cart-page">
                <div className="cart-page__loading">
                    <div className="loading-spinner"></div>
                    <p>Loading cart...</p>
                </div>
            </div>
        )
    }

    const HandleDeleteProductInCart = (item) => {
        console.log('item:', item)
        const detailId = item.detail.id

        axios.delete(`${URL_WEB}/cart-item/${detailId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                const newCartItems = cartList.cartItems.filter(
                    (cartItem) => cartItem.detail.id !== detailId
                )

                setCartList({
                    ...cartList,
                    cartItems: newCartItems
                })
                message.success('Product removed from cart successfully')
            })
            .catch(err => {
                message.error('Please login again')
            })
    }

    const HandleAdjustQuantity = (e, item) => {
        const newNum = parseInt(e.target.value)
        if(isNaN(newNum) || newNum < 1) return

        const updated = cartList.cartItems.map(itemCur => {
            if(itemCur.detail.id == item.detail.id) {
                return {...itemCur, num: newNum}
            }
            return itemCur
        })
        setCartList({
            ...cartList,
            cartItems: updated
        })
    }

    const calculateTotal = () => {
        if (!cartList || !cartList.cartItems) return 0
        return cartList.cartItems.reduce((acc, item) => {
            if(!item || !item.detail) return acc
            return acc + item.detail.price * item.num
        }, 0)
    }

    const handleCheckout = () => {
        message.info('Checkout feature is under development')
    }

    return (
        <div>
            <MenuProduct />
            <div className="cart-page">
            {/* <div className='space'></div> */}
            <BackButton />
            
            <div className="cart-page__container">
                <div className="cart-page__header">
                    <h1>Shopping Cart</h1>
                    <p>Manage and checkout the products you've selected</p>
                </div>

                <div className="cart-page__table-container">
                    <table className="cart-page__table">
                        <thead>
                            <tr>
                                <th>IMAGE</th>
                                <th>PRODUCT</th>
                                <th>DETAILS</th>
                                <th>PRICE</th>
                                <th>QUANTITY</th>
                                <th>TOTAL</th>
                                <th>REMOVE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartList && cartList.cartItems && cartList.cartItems.length > 0 ? (
                                cartList.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img 
                                                src={item.item.imageUrl} 
                                                className="cart-page__image" 
                                                alt={item.item.name}
                                            />
                                        </td>
                                        <td>
                                            <div className="cart-page__product-name">
                                                {item.item.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="cart-page__product-detail">
                                                {item.detail.info}
                                            </div>
                                        </td>
                                        <td className="cart-page__price">
                                            ${item.detail.price.toLocaleString('en-US')}
                                        </td>
                                        <td>
                                            <div className="cart-page__quantity-control">
                                                <input 
                                                    className="qty-input" 
                                                    value={item.num} 
                                                    max={item.detail.quantity}  
                                                    type='number' 
                                                    onChange={(e) => HandleAdjustQuantity(e, item)}
                                                />
                                            </div>
                                        </td>
                                        <td className="cart-page__total-price">
                                            ${(item.detail.price * item.num).toLocaleString('en-US')}
                                        </td>
                                        <td>
                                            <button 
                                                className="cart-page__remove-btn" 
                                                onClick={() => HandleDeleteProductInCart(item)}
                                                title="Remove product"
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="cart-page__empty-cart">
                                        <div className="empty-icon"></div>
                                        <div className="empty-text">Your cart is empty</div>
                                        <div className="empty-subtext">Add products to your cart to start shopping</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {cartList && cartList.cartItems && cartList.cartItems.length > 0 && (
                    <div className="cart-page__summary">
                        <div className="summary-header">
                            <h3>Order Summary</h3>
                        </div>
                        
                        <div className="summary-item">
                            <span className="label">Number of products:</span>
                            <span className="value">{cartList.cartItems.length}</span>
                        </div>
                        
                        <div className="summary-item">
                            <span className="label">Total quantity:</span>
                            <span className="value">
                                {cartList.cartItems.reduce((acc, item) => acc + item.num, 0)}
                            </span>
                        </div>
                        
                        <div className="summary-item">
                            <span className="label">Total amount:</span>
                            <span className="value">${calculateTotal().toLocaleString('en-US')}</span>
                        </div>
                        
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default Cart