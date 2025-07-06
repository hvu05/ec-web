import { useNavigate } from "react-router-dom"
import './Back.scss'

function BackButton() {
    const navigate = useNavigate();
    return (
        <button className="buttonBack" onClick={() => navigate('/home')}>
            Back
        </button>
    );
}

export default BackButton