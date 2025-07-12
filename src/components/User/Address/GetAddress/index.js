import axios from "axios"
import { useEffect, useState } from "react"
import { URL_WEB } from "../../../../constants"
import { message } from "antd"
import PutAddress from "../PutAddress"
import './GetAddress.scss'

function GetAddress(props) {
    const userId = props.userId
    // console.log('userId in get-address', userId)
    const token = localStorage.getItem('token')
    const [ListAddress, setListAddress] = useState(null)
    const [editingAddress, setEditingAddress] = useState(null);

    useEffect(() => {
        const getAddress = async () => {
            try {
                const response = await axios.get(`${URL_WEB}/user/${userId}/address`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log('res in get-add', response.data.data)
                setListAddress(response.data.data)
            } catch {
                message.error('err at get address')
            }
        }
        getAddress()
    }, [])

    const HandleEditAddress = (item) => {
        setEditingAddress(item)
        console.log('item in handle edit address', item)
    }
    return (
        <>
            <div className="get-address">GetAddress</div>
            {/*  
             When click Edit Address, send to props include (
                props_1: item (data of each element in array)
                props_2: user_Id   
             )
            */}
            {ListAddress &&
                <div className="get-address-table-container">
                  <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ReceiverName</th>
                            <th>Infomation for user</th>
                            <th>Phone</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                            {ListAddress.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {item.receiverName}
                                    </td>
                                    <td>
                                        {item.info}, {item.ward}, {item.district}, {item.province}
                                    </td>
                                    <td>
                                        {item.phone}
                                    </td>
                                    <td>
                                        <button onClick={() => HandleEditAddress(item)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                  </table>
                </div>
            }
            
            {editingAddress && (
                <PutAddress userId={userId} Information={editingAddress} />
            )}
        </>
    )
}
export default GetAddress