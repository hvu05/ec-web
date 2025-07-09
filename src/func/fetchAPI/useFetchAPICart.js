import { useEffect, useState } from "react"
import { URL_CART} from "../../constants"
import axios from "axios"

function useFetchAPIcart() {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    // console.log('Token in Fetch:', token)
    useEffect(() => {
        const FetchCart = async () => {
            try {
                const response = await axios.get(URL_CART, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                // console.log('In useFetch cart', response.data.data.cartItems)
                setCart(response.data.data.cartItems)
                setLoading(false)
            } catch(err) {
                // console.log('Error at fetch cart', err)
                setLoading(false)
            }
        }
        FetchCart()
    }, [])
    return {cart, loading}
}
export default useFetchAPIcart