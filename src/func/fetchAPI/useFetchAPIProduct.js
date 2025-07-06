import { useEffect, useState } from "react"
import { URL_PRODUCT } from "../../constants"
import axios from "axios"

function useFetchAPIProduct() {
    const [product, setproduct] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    useEffect(() => {
        const getProduct = async () => {
            try {
                const reponse = await axios.get(`${URL_PRODUCT}`, {
                    headers: {Authorization: `Bearer ${token}`}, 
                    params: {}
                })
                setproduct(reponse.data)
                console.log('Response data:', reponse.data.data)
                setLoading(false)
            } catch {
                setLoading(false)
            }
        }
        getProduct()
    }, [])
    return { product, loading }
}   
export default useFetchAPIProduct