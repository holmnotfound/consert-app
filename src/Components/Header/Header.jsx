import NavBar from "../Navbar/NavBar"
import TitleForPage from "../TitleForPage/TitleForPage"

function Header ({title}){
    return(
        <section className="header">
            <TitleForPage title={title} />
            <NavBar />
        </section>
    )
}

export default Header