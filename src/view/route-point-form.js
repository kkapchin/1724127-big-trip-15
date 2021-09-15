import { CheckboxState } from '../const.js';
import SmartView from './smart.js';

const EVENT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Transport',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const createPicturesTemplate = (pictures) => {
  const picturesElements = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`);

  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${picturesElements.join('')}
            </div>
          </div>`;
};

const createOffersTemplate = (offers) => {
  const offersElements = offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" checked>
      <label class="event__offer-label" for="event-offer-${offer.title}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`);

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersElements.join('')}
            </div>
          </section>`;
};

const createEventTypesTemplate = (actualType) => {
  const eventTypesElements = EVENT_TYPES.map((eventType) => {
    const checkboxState = (eventType.toLowerCase() === actualType) ? CheckboxState.TRUE : CheckboxState.FALSE;
    const type = eventType.toLowerCase();

    return `<div class="event__type-item">
              <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checkboxState}>
              <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${eventType}</label>
            </div>`;
  });

  return eventTypesElements.join('');
};

const createNewPoint = (data) => {
  const {type, city, pictures, description, dispatchDate, dispatchTime, arrivalDate, arrivalTime, price, offers, isOffers, isPictures} = data;
  const offersTemplate = isOffers ? createOffersTemplate(offers) : '';
  const picturesTemplate = isPictures ? createPicturesTemplate(pictures) : '';
  const eventTypesTemplate = createEventTypesTemplate(type);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypesTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dispatchDate} ${dispatchTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${arrivalDate} ${arrivalTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offersTemplate}
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          ${picturesTemplate}
        </section>
      </section>
    </form>
  </li>`;
};

export default class RoutePointForm extends SmartView {
  constructor(point) {
    super();
    this._data = RoutePointForm.parsePointToData(point);

    this._rollupClickHandler = this._rollupClickHandler.bind(this);
    this._saveClickHandler = this._saveClickHandler.bind(this);
    this._eventTypeClickHandler = this._eventTypeClickHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createNewPoint(this._data);
  }

  reset(point) {
    this.updateData(
      RoutePointForm.parsePointToData(point),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._rollupClickHandler);
  }

  setSaveClickHandler(callback) {
    this._callback.saveClick = callback;
    this.getElement()
      .querySelector('.event__save-btn')
      .addEventListener('click', this._saveClickHandler);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._rollupClickHandler);
    this.getElement()
      .querySelector('.event__save-btn')
      .addEventListener('click', this._saveClickHandler);
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('click', this._eventTypeClickHandler);
    this.getElement()
      .querySelector('.event__input')
      .addEventListener('input', this._destinationInputHandler);
  }

  _rollupClickHandler(event) {
    event.preventDefault();
    this._callback.rollupClick();
  }

  _saveClickHandler(event) {
    event.preventDefault();
    this._callback.saveClick();
  }

  _eventTypeClickHandler(event) {
    const checkboxElement = event.target.previousElementSibling;
    this._data.type = checkboxElement.value;
    event.preventDefault();
    checkboxElement.checked = !checkboxElement.checked;
    this.updateData(this._data.type);
  }

  _destinationInputHandler(event) {
    event.preventDefault();
    this.updateData({
      city: event.target.value,
    }, true);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isOffers: point.offers !== undefined,
        isPictures: point.pictures !== undefined,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isOffers;
    delete data.isPictures;

    return data;
  }
}

