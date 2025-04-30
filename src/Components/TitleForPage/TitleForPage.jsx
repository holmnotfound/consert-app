import './TitleForPage.css'

function TitleForPage ({title}){
    return (
        <section className="header__title">
            <p className="header__title-text">{title}</p>
        </section>
    )
}

export default TitleForPage