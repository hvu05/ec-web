import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { URL_WEB } from "../../constants"
import { useEffect, useState } from "react"
import ButtonGroup from "antd/es/button/button-group"

function AddDetail() {
    const location = useLocation()
    const id = location.state.id || null
    // console.log('iddd', id)
    // console.log('Product in AddDetail', product)
    const [listProd, setListProd] = useState(null)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        HandleGetDetailById()
    }, [])

    const HandleGetDetailById = async () => {
        try {
            const response = await axios.get(`${URL_WEB}/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log('Response in get', response.data.data)
            setListProd(response.data.data.productDetail)
        } catch {
            console.log('err at get')
        }
    }
    const HandleAddDetail = async () => {
        try {
            const response = await axios.post(`${URL_WEB}/product/${id}/detail`, {
                info: "xanh da troi 23",
                price: 70,
                quantity: 804
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setListProd(response.data.data.productDetail)
            console.log('OK', response.data.data)
        } catch {
            console.log('err at post detail')
        }
    }
    const HandleDeleteDetail = async (id) => {
        try {
            await axios.delete(`${URL_WEB}/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log('delete response', response)
            await HandleGetDetailById()
        } catch {
            console.log('err at delete')
        }
    }
    return (
        <>
            <button onClick={() => navigate(-1)}>Back</button>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Info</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Xóa detail</th>
                    </tr>
                </thead>
                <tbody>
                    {listProd && listProd.map((prod, index) => (
                        <tr key={index}>
                            <td>{prod.id}</td>
                            <td>{prod.info}</td>
                            <td>{prod.price}</td>
                            <td>{prod.quantity}</td>
                            <td><button onClick={() => HandleDeleteDetail(prod.id)}>x</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={HandleAddDetail}>Thêm detail</button>
            {/* <button onClick={HandleGetDetailById}>get</button> */}
        </>
    )
}
export default AddDetail