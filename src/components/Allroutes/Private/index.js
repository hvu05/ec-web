import { Navigate, Outlet } from "react-router-dom"

function Private() {
    const token = localStorage.getItem("token") // hoặc đặt tên khác nếu bạn dùng token admin

    return token ? <Outlet /> : <Navigate to="/" replace />
}

export default Private
