import { useEffect, useState } from "react"
import { URL_CATEGORY } from "../../constants"
import { message } from "antd"

function useFetchAPICategory() {
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    useEffect(() => {
        fetch(URL_CATEGORY, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(cate => {
                setCategory(cate)
                setLoading(false)
            })
            .catch(err => {
                message.error('Error from component ListCategory', err)
                setLoading(false)
            })
    }, [])
    return { category, loading }
}
export default useFetchAPICategory