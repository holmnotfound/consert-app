import './Button.css'
import { useNavigate } from 'react-router-dom'

function Button ({type, text, page}){

    const navigate = useNavigate();

    const handleClick = () => {
       navigate(page);
    }


    return(
        <section className="button__wrapper">
            <button className={`button button--${type}`} onClick={handleClick}>{text}</button>
        </section>
    )
}

export default Button