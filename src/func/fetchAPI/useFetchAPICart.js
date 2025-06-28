import { useEffect, useState } from "react"
import { URL_CART} from "../../constants"

function useFetchAPIcart() {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    // console.log('Token in Fetch:', token)
    useEffect(() => {
        fetch(URL_CART, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(cart => {
                setCart(cart)
                setLoading(false)
            })
            .catch(err => {
                console.log("Loi khi loading san pham", err)
                setLoading(false)
            })
    }, [])
    return {cart, loading}
}
export default useFetchAPIcart