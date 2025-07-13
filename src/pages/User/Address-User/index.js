import Address from "../../../components/User/Address/AddAddress"
import GetAddress from "../../../components/User/Address/GetAddress"

function AddressUser({userId}) {
    console.log('id', userId)
    return (
        <>
            <GetAddress userId={userId}/>
            <Address />
        </>
    )
}
export default AddressUser