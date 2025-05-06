import React, { useEffect } from "react";
import useCartStore from "../../Stores/useCartStore";
import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid"; 
import "./Ticket.css";

function Ticket() {
  const [showConfetti, setShowConfetti] = React.useState(true);

  const { fetchEvents, cart } = useCartStore();

  const [ticketIDs, setTicketIDs] = React.useState([]);

  useEffect(() => {
    if (cart.length > 0) {
      const ids = cart.flatMap((item) =>
        Array.from({ length: item.quantity }, () => generateTicketID())
      );
      setTicketIDs(ids);
    }
  }, [cart]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (cart.length === 0) {
    return <p className="order-cart__error-msg">Din kundvagn är tom.</p>;
  }

  const usedTicketIDs = new Set();

  const generateTicketID = () => {
    let newID;
    do {
      newID = uuidv4().slice(0, 5).toUpperCase();
    } while (usedTicketIDs.has(newID));
  
    usedTicketIDs.add(newID);
    return newID;
  };
  


  /*const generateTicketID = () => {
    const uuid = uuidv4();
    return uuid.slice(0, 5).toUpperCase();
  };*/

  const getEventSectionLetter = (eventId) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const hash = eventId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % letters.length;
    return letters[index];
  };

  const getSeatNumber = (eventId, ticketIndex) => {
    const baseSeatNumber = eventId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seatNumber = ((baseSeatNumber + ticketIndex) % 900) + 100;
    return seatNumber;
  };

  return (
    <section>
      <div className="order-confirmation">
        {showConfetti && (
          <Confetti
            recycle={false}
            numberOfPieces={500}
          />
        )}

        <h1>Tack för din beställning!</h1>
      </div>
      <section className="ticket-list">
        {cart.flatMap((item, itemIndex) =>
          Array.from({ length: item.quantity }, (_, index) => {
            const flatIndex = cart.slice(0, itemIndex).reduce((sum, item) => sum + item.quantity, 0) + index;
            const ticketID = ticketIDs[flatIndex] || `Saknas:${flatIndex}`;
            const sectionLetter = getEventSectionLetter(item.id);
            const seatNumber = getSeatNumber(item.id, index);

            return (
              <div key={ticketID} className="ticket-card">
                <p className="item__mini-title">WHAT</p>
                <h3 className="item__name">{item.name}</h3>
                <p className="item__mini-title">WHERE</p>
                <p className="item__where">{item.where}</p>
                <section className="item__when">
                  <div className="item__when-date">
                    <p className="item__mini-title">WHEN</p>
                    <p className="item__date">{item.when.date}</p>
                  </div>
                  <div className="item__when-from">
                    <p className="item__mini-title">FROM</p>
                    <p className="item__from">{item.when.from}</p>
                  </div>
                  <div className="item__when-to">
                    <p className="item__mini-title">TO</p>
                    <p className="item__to">{item.when.to}</p>
                  </div>
                </section>
                <section className="item__info">
                <p className="item__mini-title">INFO</p>
                <p className="item__section">Sektion {sectionLetter} - seat {seatNumber}, no bags allowed</p>
                </section>
                <section className="item__scan">
                    <p className="item__bar-code">{ticketID}</p>
                   <p className="item__id">#{ticketID}</p> 
                </section>
                
              </div>
            );
          })
        )}
      </section>
    </section>
  );
}

export default Ticket;
