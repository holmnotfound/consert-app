import './TextField.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TextField() {
  return (
    <section className="text-field relative w-full">
      <input
        type="text"
        placeholder="Search for event"
        className="text-field__input"
        icon="search"
      />
      <FontAwesomeIcon
        icon="search"
        className="search__icon"
      />
    </section>
  );
}

export default TextField;

