
import Header from "../../Components/Header/Header"
import EventTicketAdjuster from "../../Components/EventTicketAdjuster/EventTicketAdjuster"

function OrderPage(){
    return(
        <section>
            <Header title="Order" />
            <EventTicketAdjuster />
        </section>
    )
}

export default OrderPage