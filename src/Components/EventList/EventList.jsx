import React, { useEffect } from "react";
import "./EventList.css";
import useCartStore from "../../Stores/useCartStore";
import { Link } from "react-router-dom";

const EventsList = () => {
  const { events, fetchEvents } = useCartStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    let month = date.toLocaleString("sv-SE", { month: "short" });
    month = month.substring(0, 3);
    return { day, month };
  };

  return (
    <div>
      {events.length === 0 ? (
        <p>Loading Events! Sit Tight</p>
      ) : (
        events.map((event) => {
          const { day, month } = formatDate(event.when.date);
          return (
            <Link
              className="event__link"
              to={`/Events/${event.id}`}
              key={event.name}
            >
              <section className="event" key={event.id}>
                <section className="event__date">
                  <p className="event__day">{day}</p>
                  <p className="event__month">{month}</p>
                </section>
                <section className="event__info">
                  <h3 className="event__name">{event.name}</h3>
                  <p className="event__where">{event.where}</p>
                  <section className="event__time-price">
                    <p className="event__time">
                      {event.when.from} - {event.when.to}
                    </p>
                    <p className="event__price">{event.price} sek</p>
                  </section>
                </section>
              </section>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default EventsList;
