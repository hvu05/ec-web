import { useNavigate } from "react-router-dom"
import './Back.scss'

function BackButton() {
    const navigate = useNavigate()
    const HandleBack = () => {
        navigate('/home')
    }
    return (
        <>
            <div className="buttonBack">
                <button onClick={HandleBack}>Back</button>
            </div>
        </>
    )
}
export default BackButton