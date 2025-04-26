import './TitleForPage.css'

function TitleForPage ({Title}){
    return (
        <section className="header__title">
            <p className="header__title-text">{Title}</p>
        </section>
    )
}

export default TitleForPage