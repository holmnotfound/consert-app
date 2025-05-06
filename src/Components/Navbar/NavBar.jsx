import NavItem from "../NavItem/NavItem"
import './Navbar.css'

function NavBar(){
    return(
        <section className="navbar">
            <NavItem to="/" label="Home" />
            <NavItem to="/Events" label="Events" />
            <NavItem to="/Order" label="Order" />
        </section>
    )
}

export default NavBar