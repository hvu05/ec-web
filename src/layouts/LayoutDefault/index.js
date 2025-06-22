import { Outlet } from "react-router-dom"

function LayoutDefault() {
    const token = localStorage.getItem('token')
    return (
        <>
            {/* <Menu /> */}
            {token ? (<> 
                <Outlet />
             </>) : (<> 
                <div>
                    <Outlet />
                </div>
                
              </>)}
        </>
    )
}
export default LayoutDefault