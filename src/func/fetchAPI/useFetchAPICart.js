import { useEffect, useState } from "react"
import { URL_CART} from "../../constants"

function useFetchAPIcart() {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(URL_CART)
            .then(res => res.json())
            .then(cart => {
                setCart(cart)
                setLoading(false)
            })
            .catch(err => {
                console.log("Loi khi loading san pham")
                setLoading(false)
            })
    }, [])
    return {cart, loading}
}
export default useFetchAPIcart