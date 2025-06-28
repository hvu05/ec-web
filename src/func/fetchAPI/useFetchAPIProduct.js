import { useEffect, useState } from "react"
import { URL_PRODUCT} from "../../constants"

function useFetchAPIProduct() {
    const [product, setproduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(URL_PRODUCT)
            .then(res => res.json())
            .then(product => {
                setproduct(product)
                setLoading(false)
            })
            .catch(err => {
                console.log("Loi khi loading san pham")
                console.log(err)
                setLoading(false)
            })
    }, [])
    return {product, loading}
}
export default useFetchAPIProduct