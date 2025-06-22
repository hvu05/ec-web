import useFetchAPIcart from '../../func/fetchAPI/useFetchAPICart'
import './Cart.scss'
function Cart() {

    const { cart, loading } = useFetchAPIcart()
    const cartList = cart.result
    // console.log(cartList)

    if (loading) return (<div>Loading...</div>)

    // cartList.map(item => {
    //     console.log(item.item.productDetail[0].info)
    // })

    return (
        <>
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>IMAGE</th>
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                        <th>REMOVE</th>
                    </tr>
                </thead>
                <tbody>
                    {cartList.map((item, index) => (
                        <tr key={index}>
                            <td><img src={item.item.imageUrl} class="cart-image" /></td>
                            <td>
                                <div class="product-name">{item.item.name}</div>
                                <div class="product-detail">{item.item.productDetail[0].info}</div> 
                            </td>
                            <td>$80.00</td>
                            <td>
                                <div class="quantity-control" data-price="80">
                                    <button class="qty-btn">-</button>
                                    <span class="qty">{item.item.productDetail[0].quantity}</span>
                                    <button class="qty-btn">+</button>
                                </div>
                            </td>
                            <td class="total-price">$80.00</td>
                            <td><button class="remove-btn">✕</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}
export default Cart