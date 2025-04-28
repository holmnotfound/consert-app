import Header from "../../Components/Header/Header"
import TextField from "../../Components/TextField/TextField"
import EventsList from "../../Components/EventList/EventList"

function EventPage(){
    return(
        <section>
            <Header />
            <TextField />
            <EventsList />
        </section>
    )
}

export default EventPage