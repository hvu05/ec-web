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
    // const [refreshFlag, setRefreshFlag] = useState(false)
    const { cart, loading } = useFetchAPIcart()
    const [cartList, setCartList] = useState(cart)

    const token = localStorage.getItem('token')
    // console.log('cart', cartList)

    useEffect(() => {

        setCartList(cart)

    }, [cart])

    // useEffect(() => {
    //     {cart, loading} = useFetchAPIcart(refreshFlag)
    // }, [refreshFlag])
    // if (loading) {
    //     return (
    //         <div className="cart-page">
    //             <div className="cart-page__loading">
    //                 <div className="loading-spinner"></div>
    //                 <p>Loading cart...</p>
    //             </div>
    //         </div>
    //     )
    // }

    const HandleDeleteProductInCart = async (item) => {
        const detailId = item.detail.id

        try {
            await axios.delete(`${URL_WEB}/cart-item/${detailId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCartList(items => items.filter(item => item.detail.id !== detailId))
            message.success('Change detail success')
        }
        catch {
            message.error('Delete detail error')
        }
    }

    const HandleAdjustQuantity = (e, item) => {
        const newNum = parseInt(e.target.value)
        if (isNaN(newNum) || newNum < 1) return

        const updated = cartList.cartItems.map(itemCur => {
            if (itemCur.detail.id == item.detail.id) {
                return { ...itemCur, num: newNum }
            }
            return itemCur
        })
        setCartList({
            ...cartList,
            cartItems: updated
        })
    }

    const calculateTotal = () => {
        if (!cartList) return 0
        return cartList.reduce((acc, item) => {
            if (!item || !item.detail) return acc
            return acc + item.detail.price * item.num
        }, 0)
    }

    const handleCheckout = () => {
        message.info('Checkout feature is under development')
    }

    const HandlePutInfo = async (infoDetail, item, numDetail = item.num) => {
        console.log('item', item)
        const listDetail = item.item.productDetail
        const oldId = item.detail.id
        const newId = listDetail.find(item => item.info === infoDetail).id
        // const num = item.num

        try {
            const response = await axios.put(`${URL_WEB}/cart-item/${oldId}`, {
                detailId: newId,
                num: numDetail
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            message.success('Change detail success')

            setCartList(items =>
                items.map(item =>
                    item.detail.id === oldId
                        ? { ...item, detail: response.data.data.detail, num: Number(numDetail) }
                        : item
                )
            )

        } catch {
            message.error('Change detail error')
        }
        message.info('Change info feature is under development')
    }
    return (
        <div>
            <MenuProduct />
            <div className="cart-page">
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
                                {cartList && cartList.length > 0 ? (
                                    cartList.map((item, index) => (
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
                                                <select
                                                    className="cart-page__product-detail"
                                                    onChange={(e) => HandlePutInfo(e.target.value, item)}
                                                    value={item.detail.info}
                                                >
                                                    {item.item.productDetail && item.item.productDetail.map((detail) => (
                                                        <option key={detail.id}>{detail.info}</option>
                                                    ))}
                                                </select>
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
                                                        onChange={(e) => HandlePutInfo(item.detail.info, item, e.target.value)}
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

                    {cartList && (
                        <div className="cart-page__summary">
                            <div className="summary-header">
                                <h3>Order Summary</h3>
                            </div>

                            <div className="summary-item">
                                <span className="label">Number of products:</span>
                                <span className="value">{cartList.length}</span>
                            </div>

                            <div className="summary-item">
                                <span className="label">Total quantity:</span>
                                <span className="value">
                                    {cartList.reduce((acc, item) => acc + item.num, 0)}
                                </span>
                            </div>

                            <div className="summary-item">
                                <span className="label">Total amount:</span>
                                <span className="value">${calculateTotal().toLocaleString('en-US')}</span>
                            </div>

                            <button className="checkout-btn" onClick={handleCheckout} disabled={!cartList || cartList.length === 0}>
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