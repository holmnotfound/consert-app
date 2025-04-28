import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EventDetailContent.css";
import useCartStore from "../../Stores/useCartStore";
import PriceControls from "../PriceControls/PriceControls";

function EventDetailContent() {
    const { id } = useParams();
    const { events, fetchEvents } = useCartStore();
  
    useEffect(() => {
      if (events.length === 0) fetchEvents();
    }, []);
  
    const event = events.find((e) => e.id === id);

  
    if (!event) return <p>Laddar event...</p>;
  

  return (
    <section className="event-detail">
      <p className="detail__slogan">You are about to score some tickets to</p>
      <section className="event-detail__info">
        <p className="event-detail__name">{event.name}</p>
        <p className="event-detail__when">{event.when.date} {event.when.from} – {event.when.to}</p>
        <p className="event-detail__where">@ {event.where}</p>
      </section>

      <PriceControls event={event} />
    </section>
  );
}

export default EventDetailContent;
