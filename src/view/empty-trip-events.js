import { createElement } from '../utils/create-element.js';

const createEmptyTripElement = (value) => `<p class="trip-events__msg">${value}</p>`;

export default class EmptyTrip {
  constructor() {
    this._element = null;
    this._everythingValue = 'Click New Event to create your first point';
    this._futureValue = 'There are no future events now';
    this._pastValue = 'There are no past events now';
  }

  getTemplate(value) {
    return createEmptyTripElement(value);
  }

  getElement(filter) {
    switch(filter) {
      case 'Everything':
        this._element = createElement(createEmptyTripElement(this._everythingValue));
        return this._element;
      case 'Future':
        this._element = createElement(createEmptyTripElement(this._futureValue));
        return this._element;
      case 'Past':
        this._element = createElement(createEmptyTripElement(this._pastValue));
        return this._element;
    }
  }

  removeElement() {
    this._element = null;
  }
}
