import { useEffect, useState } from "react"
import { URL_CATEGORY } from "../../constants"
import { message } from "antd"
import axios from 'axios'

function useFetchAPICategory() {
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get(URL_CATEGORY, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log('res:', res.data.data)
                setCategory(res.data.data)
                setLoading(false)
            })
            .catch(err => {
                message.error('Error from component ListCategory')
                console.error(err)
                setLoading(false)
            })
    }, [])
    return { category, loading }
}
export default useFetchAPICategory