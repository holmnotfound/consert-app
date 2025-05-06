import logo from '../../assets/Images/logo 2.png'
import './LandingContent.css'
import Button from "../../Components/Button/Button.jsx"
/* import '../../index.css' */

function LandingContent() {
    return(
        <section className="landing-content">
            <img className='landing-content__logo' src={logo} alt="Logo" />
            <p className='landing-content__title'>Where It’s @</p>
            <p className='landing-content__slogan'>Ticketing made easy</p>
            <Button type='event' text='Events' page='/Events'/>
        </section>
    )
}

export default LandingContent