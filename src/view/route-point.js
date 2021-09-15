import AbstractView from './abstract.js';

const renderOffers = (offers) => {
  if(!offers) {
    return '';
  }

  const offersElements = offers.map((element) =>
    `<li class="event__offer">
        <span class="event__offer-title">${element.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${element.price}</span>
      </li>`);

  return `<ul class="event__selected-offers">
            ${offersElements.join('')}
          </ul>`;
};

const createRoutePointsTemplate = (point) => (
  `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${point.dateClass}">${point.eventDay}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type} ${point.destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${point.dispatchTimeClass}">${point.dispatchTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${point.arrivalTimeClass}">${point.arrivalTime}</time>
        </p>
        <p class="event__duration">${point.duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${renderOffers(point.offers)}
      <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);

export default class RoutePoint extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._rollupClickHandler = this._rollupClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createRoutePointsTemplate(this._point);
  }

  _rollupClickHandler(event) {
    event.preventDefault();
    this._callback.rollupClick();
  }

  _favoriteClickHandler(event) {
    event.preventDefault();
    this._callback.favoriteClick();
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
