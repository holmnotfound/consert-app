import { NavLink } from "react-router-dom"
import "./NavItem.css"

function NavItem({to, label}){
    return(
        <section className="nav-item">
           <NavLink className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} to={to}>{label}</NavLink>
        </section>
    )
}

export default NavItem