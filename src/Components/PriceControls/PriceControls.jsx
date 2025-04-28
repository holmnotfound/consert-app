import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import useCartStore from "../../Stores/useCartStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "../../Components/Button/Button.jsx";
import './PriceControls.css';

function PriceControls() {
  const { id } = useParams();
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

  const event = events.find((e) => e.id === id);
  const quantity = cart.find((item) => item.id === id)?.quantity || 0;
  const totalPrice = getTotalPrice(id);

  if (!event) return <p>Eventet hittades inte</p>;

  return (
    <section className="price-controls">
      <section className='price-controls__wrapper'>
        <span className='total-price'>{totalPrice} sek</span>
        <div className="event-detail__controls">
        <button className="btn-sub" onClick={() => removeFromCart(event.id)} disabled={quantity === 0}>
      <FontAwesomeIcon icon="minus" />
    </button>

    <span className="quantity">{quantity}</span>

    <button className="btn-add" onClick={() => addToCart(event)}>
      <FontAwesomeIcon icon="plus" />
    </button>
      </div>
      </section>
      <Button onClick={() => addToCart(event)} page="/Order" text="Lägg till i kundvagn" />
    </section>
  );
}

export default PriceControls;



