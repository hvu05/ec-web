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
    // const [total, setTotal] = useState(0)
    const [num, setNum] = useState(0)
    const token = localStorage.getItem('token')
    console.log(cart.result)
    useEffect(() => {
        if (cart && cart.result) {
            setCartList(cart.result)
        }
    }, [cart])
    
    if (loading) {return (<div>Loading...</div>)}

    const HandleDeleteProductInCart = (item) => {
        console.log('item:', item)
        const detailId = item.detail.id

        axios.delete(`${URL_WEB}/cart-item/${detailId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                // console.log('Deleted:', res)

                // update cartList after deleted
                const newCartItems = cartList.cartItems.filter(
                    (cartItem) => cartItem.detail.id !== detailId
                )

                setCartList({
                    ...cartList,
                    cartItems: newCartItems
                })
                // console.log(newCartItems)
                // setTotal(cartList.totalPrice)
            })
            .catch(err => {
                message.error('Bạn cần phải đăng nhập lại')
            })
    }
    const calTotal = cartList?.cartItems.reduce((acc, item) => {
        if(!item || !item.detail) return acc
        return acc + item.detail.price * item.num
    }, 0)
    const HandleAdjustQuantity = (e, item) => {
        const newNum = parseInt(e.target.value)
        if(isNaN(newNum) || newNum < 1) return

        const updated = cartList.cartItems.map(itemCur => {
            if(itemCur.detail.id == item.detail.id)
            {
                // console.log("Item Current:", itemCur)
                return (
                    {...itemCur, num: newNum}
                )
            }
            return itemCur
        })
        setCartList({
            ...cartList,
            cartItems: updated
        })
        // ! PUT method use to change cartList
    }
    /* 
       ! BackEnd hasn't been finished method PUT in cart-item
    */
    return (
        <>
            <MenuProduct />
            <div className='space'></div>
            <BackButton />
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>IMAGE</th>
                        <th>PRODUCT</th>
                        <th>DETAIL</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                        <th>REMOVE</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log(cartList.cartItems)} */}
                    {/* {cartList ? cartList.cartItems.map(item => {setTotal(total + item.detail.price * item.num)}) : <>...</>} */}
                    {(cartList) ? (cartList.cartItems.map((item, index) => (
                        // setTotal(total + item.detail.price * item.num)
                        <tr key={index}>
                            <td><img src={item.item.imageUrl} className="cart-image" alt={index}/></td>
                            <td>
                                <div className="product-name">{item.item.name}</div>
                            </td>
                            <td>
                                <div className="product-detail">{item.detail.info}</div>
                            </td>
                            <td>{item.detail.price}</td>
                            <td>
                                <div className="quantity-control" data-price="80">
                                    {/* <button className="qty-btn">-</button> */}
                                    {/* <span className="qty">{item.num}</span> */}
                                    <input className="qty-btn" value={item.num} max={item.detail.quantity}  type='number' onChange={(e) => HandleAdjustQuantity(e, item)}/>
                                    {/* <button className="qty-btn">+</button> */}
                                </div>
                            </td>
                            
                            <td className="total-price">{item.detail.price * item.num}</td>
                            <td><button className="remove-btn" onClick={() => HandleDeleteProductInCart(item)}>✕</button></td>
                        </tr>
                        
                    ))) : (
                        <tr>
                            <td colSpan={7} className='product-detail'>Giỏ hàng đang trống</td>
                        </tr>
                    )}

                </tbody>
            </table>
                {/* <trong>Total price: {calTotal}</trong> */}
        </>
    )
}
export default Cart