import React, { useEffect } from "react";
import useCartStore from "../../Stores/useCartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Components/Button/Button.jsx";
import "./EventTicketAdjuster.css";

function EventTicketAdjuster() {
  const {
    events,
    fetchEvents,
    cart,
    getTotalPrice,
    addToCart,
    removeFromCart,
  } = useCartStore();

  useEffect(() => {
    if (events.length === 0) fetchEvents();
  }, []);

  if (cart.length === 0) {
    return <p className="order-cart__error-msg">Din kundvagn är tom.</p>;
  }
  const totalCartPrice = cart.reduce(
    (sum, item) => sum + getTotalPrice(item.id),
    0
  );

  return (
    <section className="ticket-adjuster">
      {cart.map((item) => {
        const quantity = item.quantity;

        return (
          <section key={item.id} className="price-controls">
            
            <section className="event-controls__wrapper">
                <h3 className="event__title">{item.name}</h3>
                <p className="event__when">{item.when.date} {item.when.from} – {item.when.to} </p>
              <div className="event-detail__controls">
                <button
                  className="btn-sub"
                  onClick={() => removeFromCart(item.id)}
                  disabled={quantity === 0}
                >
                  <FontAwesomeIcon icon="minus" />
                </button>

                <span className="quantity">{quantity}</span>

                <button className="btn-add" onClick={() => addToCart(item)}>
                  <FontAwesomeIcon icon="plus" />
                </button>
              </div>
            </section>
          </section>
        );
      })}
      <section className="ticket-adjuster__footer">
        <h4 className="ticket-adjuster__footer-total-price">Totalt belopp: {totalCartPrice} sek</h4>

        <Button page="/Ticket" text="Skicka Order" />
      </section>
    </section>
  );
}

export default EventTicketAdjuster;
