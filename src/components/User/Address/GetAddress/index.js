import axios from "axios"
import { useEffect, useState } from "react"
import { URL_WEB } from "../../../../constants"
import { message } from "antd"
import PutAddress from "../PutAddress"
import './GetAddress.scss'
import Address from "../AddAddress"

function GetAddress(props) {
    const userId = props.userId
    const token = localStorage.getItem('token')
    const [ListAddress, setListAddress] = useState(null)
    const [editingAddress, setEditingAddress] = useState(null);
    const [addressId, setAddressId] = useState('')

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
        setAddressId(item.id)
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
                <div className="get-address-container">

                    {ListAddress.map(item => (
                        <div className="get-address">
                            <div><i className="fa-solid fa-house"></i></div>

                            <div>
                                <div>{item.receiverName}</div>
                                <div>{item.info}, {item.ward}</div>
                            </div>

                            <div>
                                <span className="default-address">
                                    {item.default ? 'Default' : 'Not Default'}
                                </span>
                                <button onClick={() => HandleEditAddress(item)}>
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            }
            {editingAddress && (
                <PutAddress userId={userId} addressId={addressId} item={editingAddress}/>
            )}
        </>
    )
}
export default GetAddress