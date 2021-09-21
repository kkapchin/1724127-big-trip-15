import { Autocomplete, BLANK_POINT, Checkbox, Order } from '../const.js';
import { generateDestinations, updateOffers } from '../mock/mocks.js';
import { isEnterEvent, isEscEvent } from '../utils/keyboard-events.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

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

const reg = /^\d{1,7}$/;

const destinations = generateDestinations()
  .sort((a, b) => a.name > b.name);

const [...destinationCities] = new Set(destinations.map((destination) => destination.name));

const createOptionsTemplate = () => {
  const optionsElements = destinations.map((destination) => `<option value="${destination.name}">${destination.name}</option>`);
  return optionsElements.join('');
};

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
    const checkboxState = (eventType.toLowerCase() === actualType) ? Checkbox.TRUE : Checkbox.FALSE;
    const type = eventType.toLowerCase();

    return `<div class="event__type-item">
              <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checkboxState}>
              <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${eventType}</label>
            </div>`;
  });

  return eventTypesElements.join('');
};

const createPointFormTemplate = (data) => {
  const {type, destination, dispatchDate, arrivalDate, price, offers, isOffers, isPictures} = data;
  const offersTemplate = isOffers ? createOffersTemplate(offers) : '';
  const picturesTemplate = isPictures ? createPicturesTemplate(destination.pictures) : '';
  const eventTypesTemplate = createEventTypesTemplate(type);
  const optionsTemplate = createOptionsTemplate();

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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" ${Autocomplete.OFF}>
          <datalist id="destination-list-1">
            ${optionsTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dispatchDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${arrivalDate}">
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
          <p class="event__destination-description">${destination.description}</p>
          ${picturesTemplate}
        </section>
      </section>
    </form>
  </li>`;
};

export default class PointForm extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._data = PointForm.parsePointToData(point);
    this._datepickrDispatch = null;
    this._datepickrArrival = null;

    this._rollupClickHandler = this._rollupClickHandler.bind(this);
    this._saveClickHandler = this._saveClickHandler.bind(this);
    this._eventTypeClickHandler = this._eventTypeClickHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._destinationFocusoutHandler = this._destinationFocusoutHandler.bind(this);
    this._destinationKeydownHandler = this._destinationKeydownHandler.bind(this);
    this._dispatchDateChangeHandler = this._dispatchDateChangeHandler.bind(this);
    this._arrivalDateChangeHandler = this._arrivalDateChangeHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._priceInputKeydownHandler = this._priceInputKeydownHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickrDispatch();
  }

  getTemplate() {
    return createPointFormTemplate(this._data);
  }

  reset(point) {
    this.updateData(
      PointForm.parsePointToData(point),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickrDispatch();
    this.setSaveClickHandler(this._callback.saveClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
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

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', this._deleteClickHandler);
  }

  removeElement() {
    super.removeElement();

    if(this._datepickrDispatch) {
      this._datepickrDispatch.destroy();
      this._datepickrDispatch = null;
    }

    if(this._datepickrArrival) {
      this._datepickrArrival.destroy();
      this._datepickrArrival = null;
    }
  }

  _rollupClickHandler(event) {
    event.preventDefault();
    this._callback.rollupClick();
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
    this.getElement()
      .querySelector('.event__input')
      .addEventListener('focusout', this._destinationFocusoutHandler);
    this.getElement()
      .querySelector('.event__input')
      .addEventListener('keydown', this._destinationKeydownHandler);
    this.getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', this._deleteClickHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('keydown', this._priceInputKeydownHandler);
  }

  _saveClickHandler(event) {
    if(isEnterEvent(event)) {
      event.preventDefault();
    }
    event.preventDefault();
    this._callback.saveClick(PointForm.parseDataToPoint(this._data));
  }

  _deleteClickHandler(event) {
    event.preventDefault();
    this._callback.deleteClick(PointForm.parseDataToPoint(this._data));
  }

  _eventTypeClickHandler(event) {
    const checkboxElement = event.target.previousElementSibling;
    const newOffers = updateOffers(checkboxElement.value);
    event.preventDefault();
    checkboxElement.checked = !checkboxElement.checked;
    this.updateData({
      type: checkboxElement.value,
      offers: newOffers,
      isOffers: newOffers !== undefined,
    });
  }

  _destinationInputHandler(event) {
    if(destinationCities.includes(event.target.value)) {
      this.updateData({
        city: event.target.value,
        destination: destinations.filter((destination) => destination.name === event.target.value)[0],
      });
    }
  }

  _priceInputKeydownHandler(event) {
    if(!reg.test(event.key)) {
      event.preventDefault();
    }
  }

  _destinationFocusoutHandler(event) {
    if(!destinationCities.includes(event.target.value)) {
      event.target.value = this._data.destination.name;
    }
  }

  _destinationKeydownHandler(event) {
    if(isEnterEvent(event) || isEscEvent(event)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  _dispatchDateChangeHandler([userDispatchDate]) {
    this.updateData({
      dateFrom: dayjs(userDispatchDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      dispatchDate: dayjs(userDispatchDate).format('DD/MM/YY HH:mm'),
      dispatchTime: dayjs(userDispatchDate).format('HH:mm'),
      eventDay: dayjs(userDispatchDate).format('MMM DD'),
      dateClass: dayjs(userDispatchDate).format('YYYY-MM-DD'),
    });
  }

  _arrivalDateChangeHandler([userArrivalDate]) {
    this.updateData({
      dateTo: dayjs(userArrivalDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      arrivalDate: dayjs(userArrivalDate).format('DD/MM/YY HH:mm'),
      arrivalTime: dayjs(userArrivalDate).format('HH:mm'),
    });
  }

  _setDatepickrDispatch() {
    const inputElements = this.getElement().querySelectorAll('.event__input--time');
    const dispatchInputElement = inputElements[Order.FIRST];
    const arrivalInputElement = inputElements[Order.SECOND];

    if(this._datepickrDispatch || this._datepickrArrival) {
      this._datepickrDispatch.destroy();
      this._datepickrArrival.destroy();
      this._datepickrDispatch = null;
      this._datepickrArrival = null;
    }

    this._datepickrDispatch = flatpickr(
      dispatchInputElement,
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        maxDate: this._data.arrivalDate,
        defaultDate: this._data.dispatchDate,
        onClose: this._dispatchDateChangeHandler,
      },
    );

    this._datepickrArrival = flatpickr(
      arrivalInputElement,
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._data.dispatchDate,
        defaultDate: this._data.arrivalDate,
        onClose: this._arrivalDateChangeHandler,
      },
    );
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isOffers: point.offers !== undefined,
        isPictures: point.destination.pictures !== undefined,
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

