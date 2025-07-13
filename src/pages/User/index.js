import { useEffect, useState } from "react"
import axios from "axios"
import { URL_WEB } from "../../constants"

import './User.scss'
import MenuProduct from "../../components/User/Menu"
import { useLocation, useNavigate } from "react-router-dom"
import '../../style/components/_button.scss';
import Information from "./Infomation"
import MyOrders from "./MyOrders"
// import PaidServices from "./PaidServices"
import LoyaltyProgram from "./LoyaltyProgram"
import WarrantyInfo from "./WarrantyInfo"
import AddressUser from "./Address-User"

function User() {
    const [user, setUser] = useState(null)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const location = useLocation()
    const [mes, setMes] = useState('')

    const [currentComponent, setCurrentComponent] = useState(location.state && location.state.mess)

    useEffect(() => {
        if (location.state && location.state.mess) {
            setMes(location.state.mess);
        }
    })

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${URL_WEB}/user/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                // console.log('res user', response)
                setUser(response.data.data)
            } catch {
                console.log('err at User')
            }
        }
        getUser()
    }, [mes])

    const renderComponent = () => {
        console.log('currentComponent', currentComponent)

        switch (currentComponent) {
            case 'information':
                return user && <Information users={user} />
                // return user && navigate('/infomation-user', { state: { users: user } })
            case 'orders':
                return <MyOrders />
            // case 'services':
            //     return <PaidServices />
            case 'loyalty':
                return <LoyaltyProgram />
            case 'addresses':
                return user && <AddressUser userId={user.id} />
            case 'warranty':
                return <WarrantyInfo />
            default:
                return user && <Information users={user} />
        }
    }

    return (
        <div className="user">
            <MenuProduct />
            <div className="user-page">
                <aside className="sidebar">
                    <div className="menu-side">
                        <div
                            className={currentComponent === 'information' ? 'active' : ''}
                            onClick={() => setCurrentComponent('information')}
                        >
                            <i class="fa-solid fa-user" style={{ paddingRight: '10px' }}></i> My Information
                        </div>
                        <div
                            className={currentComponent === 'orders' ? 'active' : ''}
                            onClick={() => setCurrentComponent('orders')}
                        >
                            <i class="fa-solid fa-truck-fast" style={{ paddingRight: '10px' }}></i> My Orders
                        </div>
                        <div
                            className={currentComponent === 'services' ? 'active' : ''}
                            onClick={() => setCurrentComponent('services')}
                        >
                            <i class="fa-solid fa-credit-card" style={{ paddingRight: '10px' }}></i> Paid Services
                        </div>
                        <div
                            className={currentComponent === 'loyalty' ? 'active' : ''}
                            onClick={() => setCurrentComponent('loyalty')}
                        >
                            <i class="fa-solid fa-gift" style={{ paddingRight: '10px' }}></i> Loyalty Program
                        </div>
                        <div
                            className={currentComponent === 'addresses' ? 'active' : ''}
                            onClick={() => setCurrentComponent('addresses')}
                        >
                            <i class="fa-solid fa-location-dot" style={{ paddingRight: '10px' }}></i>Shipping Addresses
                        </div>
                        <div
                            className={currentComponent === 'warranty' ? 'active' : ''}
                            onClick={() => setCurrentComponent('warranty')}
                        >
                            <i class="fa-solid fa-medal" style={{ paddingRight: '10px' }}></i>Warranty Info
                        </div>
                        <div onClick={() => navigate('/')}>
                            <i class="fa-solid fa-right-from-bracket" style={{ paddingRight: '10px' }}></i> Log Out
                        </div>
                    </div>
                </aside>

                <main className="main-content">
                    {renderComponent()}
                    {/* {currentComponent === 'information' && <button className="btn btn--primary">Edit Information</button>} */}
                </main>
            </div>
        </div>
    )
}
export default User