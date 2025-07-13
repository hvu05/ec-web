import axios from "axios"
import { useEffect, useState } from "react"
import { URL_WEB } from "../../../../constants"
import { message } from "antd"
import './PutAddress.scss'

function PutAddress(props) {
    const { userId, addressId, item } = props
    // console.log('item ', item)
    const token = localStorage.getItem('token')
    const [showForm, setShowForm] = useState(true)
    const [form, setForm] = useState({
        province: item.province,
        provinceId: item.provinceId,
        district: item.district,
        districtId: item.districtId,
        ward: item.ward,
        wardId: item.wardId,
        info: item.info,
        phone: item.phone,
        receiverName: item.receiverName,
        isDefault: item.isDefault
    })

    useEffect(() => {
        if (item) {
            setForm({
                province: item.province,
                provinceId: item.provinceId,
                district: item.district,
                districtId: item.districtId,
                ward: item.ward,
                wardId: item.wardId, // bạn đang gán nhầm wardId = ward ở trên
                info: item.info,
                phone: item.phone,
                receiverName: item.receiverName,
                isDefault: item.isDefault
            });
            setShowForm(true)
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${URL_WEB}/user/${userId}/address/${addressId}`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            message.success('Cập nhật địa chỉ thành công')
            // Có thể gọi props.onSuccess() nếu muốn reload lại danh sách địa chỉ
        } catch {
            message.error('Cập nhật địa chỉ thất bại')
        }
    }

    return (
        <>
            {showForm && <div className="put-address-form">
                <h3>Chỉnh sửa địa chỉ</h3>
                <form onSubmit={handleSubmit} className="edit-address-form">
                    <div className="form-group">
                        <label>Người nhận</label>
                        <input
                            name="receiverName"
                            value={form.receiverName || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            name="phone"
                            value={form.phone || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tỉnh/Thành phố</label>
                        <input
                            name="province"
                            value={form.province || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>ID Tỉnh</label>
                        <input
                            name="provinceId"
                            type="number"
                            value={form.provinceId || 0}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Quận/Huyện</label>
                        <input
                            name="district"
                            value={form.district || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>ID Quận</label>
                        <input
                            name="districtId"
                            type="number"
                            value={form.districtId || 0}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phường/Xã</label>
                        <input
                            name="ward"
                            value={form.ward || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>ID Phường</label>
                        <input
                            name="wardId"
                            type="number"
                            value={form.wardId || 0}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ chi tiết</label>
                        <input
                            name="info"
                            value={form.info || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mặc định</label>
                        <input
                            name="isDefault"
                            type="checkbox"
                            checked={form.isDefault || false}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Cập nhật</button>
                    <button onClick={() => setShowForm(false)}>Close</button>
                </form>
            </div>}
        </>
    )
}

export default PutAddress