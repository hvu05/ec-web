import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { URL_WEB } from "../../constants"
import { useEffect, useState } from "react"
import "./AddDetail.scss"

function AddDetail() {
    const location = useLocation()
    const id = location.state.id || null
    console.log('ID', id)
    const [listProd, setListProd] = useState(null)
    const token = localStorage.getItem('token')

    const [info, setInfo] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [showForm, setShowForm] = useState(false)

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
    const HandleAddDetail = async (e) => {
        console.log('id in func handle add', id)
        e.preventDefault()
        try {
            const response = await axios.post(`${URL_WEB}/product/${id}/detail`, {
                info: info,
                price: price,
                quantity: quantity
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
    const HandleDeleteDetail = async (idDetail) => {
        try {
            await axios.delete(`${URL_WEB}/product/${idDetail}`, {
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
        <div className="add-detail">
            <div className="add-detail__container">
                <div className="add-detail__header">
                    <h1>Quản lý Chi tiết Sản phẩm</h1>
                    <button className="add-detail__back-btn" onClick={() => navigate(-1)}>
                        ← Quay lại
                    </button>
                </div>

                <div className="add-detail__content">
                    <div className="add-detail__table-section">
                        <h2>Danh sách Chi tiết</h2>
                        <table className="add-detail__table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Thông tin</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProd && listProd.map((prod, index) => (
                                    <tr key={index} style={{ '--row-index': index }}>
                                        <td>{prod.id}</td>
                                        <td>{prod.info}</td>
                                        <td>${prod.price}</td>
                                        <td>{prod.quantity}</td>
                                        <td>
                                            <button 
                                                className="add-detail__delete-btn" 
                                                onClick={() => HandleDeleteDetail(prod.id)}
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="add-detail__form-section">
                        <button 
                            className="add-detail__add-btn" 
                            onClick={() => setShowForm(true)}
                        >
                            + Thêm Chi tiết Mới
                        </button>

                        {showForm && (
                            <form className="add-detail__form" onSubmit={HandleAddDetail}>
                                <button 
                                    type="button"
                                    className="add-detail__close-btn" 
                                    onClick={() => setShowForm(false)}
                                >
                                    ✕
                                </button>

                                <div className="form-group">
                                    <label>Thông tin</label>
                                    <input 
                                        value={info}
                                        placeholder="Nhập thông tin chi tiết"
                                        onChange={(e) => setInfo(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Giá</label>
                                    <input 
                                        value={price}
                                        placeholder="Nhập giá"
                                        type="number"
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Số lượng</label>
                                    <input 
                                        type="number"
                                        value={quantity}
                                        placeholder="Nhập số lượng"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="submit">Lưu</button>
                                    <button type="button" onClick={() => setShowForm(false)}>
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddDetail