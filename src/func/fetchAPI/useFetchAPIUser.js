import { useEffect, useState } from "react"
import { URL_USER } from "../../constants"

function useFetchAPIUser() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(URL_USER)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])
    return data
}
export default useFetchAPIUser