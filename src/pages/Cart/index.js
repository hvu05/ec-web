// File Cart.js
import axios from 'axios'
import BackButton from '../../components/Back'
import MenuProduct from '../../components/User/Menu'
import useFetchAPIcart from '../../func/fetchAPI/useFetchAPICart'
import './Cart.scss'
import { URL_WEB } from '../../constants'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { Checkbox } from 'antd'

function Cart() {
    // const [refreshFlag, setRefreshFlag] = useState(false)
    const { cart, loading } = useFetchAPIcart()
    const [cartList, setCartList] = useState(cart)
    const [selectedItems, setSelectedItems] = useState([])
    const [warrantyOptions, setWarrantyOptions] = useState({})

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
    // Chọn/bỏ chọn sản phẩm
    const handleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }
    // Chọn gói bảo hành
    const handleWarrantyChange = (id, value) => {
        setWarrantyOptions((prev) => ({ ...prev, [id]: value }))
    }
    return (
        <>
            <MenuProduct />
            <div className="cart-layout">
                <div className="cart-main">
                    <div className="cart-left">
                        {cartList && cartList.length > 0 ? (
                            cartList.map((item, index) => (
                                <div className="cart-card" key={index}>
                                    <div className="cart-card__select">
                                        <Checkbox
                                            checked={selectedItems.includes(item.detail.id)}
                                            onChange={() => handleSelectItem(item.detail.id)}
                                        />
                                    </div>
                                    <div className="cart-card__img">
                                        <img src={item.item.imageUrl} alt={item.item.name} />
                                    </div>
                                    <div className="cart-card__info">
                                        <div className="cart-card__name">{item.item.name}</div>
                                        <div className="cart-card__color">
                                            <span>Color:</span>
                                            <select
                                                value={item.detail.info}
                                                onChange={(e) => HandlePutInfo(e.target.value, item)}
                                            >
                                                {item.item.productDetail && item.item.productDetail.map((detail) => (
                                                    <option key={detail.id}>{detail.info}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* <div className="cart-card__warranty">
                                            <span>Choose warranty package</span>
                                            <div>
                                                <Checkbox
                                                    checked={warrantyOptions[item.detail.id] === 'lifetime'}
                                                    onChange={() => handleWarrantyChange(item.detail.id, warrantyOptions[item.detail.id] === 'lifetime' ? null : 'lifetime')}
                                                >
                                                    Lifetime warranty privilege +{item.detail.warrantyPrice ? item.detail.warrantyPrice.toLocaleString('en-US') : '0'} đ
                                                </Checkbox>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="cart-card__price">{item.detail.price.toLocaleString('en-US')} đ</div>
                                    <div className="cart-card__qty">
                                        <input
                                            className="qty-input"
                                            value={item.num}
                                            max={item.detail.quantity}
                                            type='number'
                                            onChange={(e) => HandlePutInfo(item.detail.info, item, e.target.value)}
                                        />
                                    </div>
                                    <div className="cart-card__total">{(item.detail.price * item.num).toLocaleString('en-US')} đ</div>
                                    <div className="cart-card__remove">
                                        <button
                                            className="cart-page__remove-btn"
                                            onClick={() => HandleDeleteProductInCart(item)}
                                            title="Remove product"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="cart-empty">
                                <div className="empty-icon"></div>
                                <div className="empty-text">Your cart is empty</div>
                                <div className="empty-subtext">Add products to your cart to start shopping</div>
                            </div>
                        )}
                    </div>
                    <div className="cart-right">
                        <div className="cart-summary">
                            <div className="summary-header">
                                <h3>Order Summary</h3>
                            </div>
                            <div className="summary-item">
                                <span className="label">Total</span>
                                <span className="value">{cartList ? cartList.reduce((acc, item) => acc + item.detail.price * item.num, 0).toLocaleString('en-US') : 0} đ</span>
                            </div>

                            <button className="checkout-btn" onClick={handleCheckout} disabled={!cartList || cartList.length === 0}>
                                Confirm order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart