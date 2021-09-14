import { createElement } from '../utils/create-element.js';
import AbstractView from './abstract.js';

const createEmptyTripElement = (value) => `<p class="trip-events__msg">${value}</p>`;

export default class EmptyTrip extends AbstractView {
  constructor() {
    super();
    this._everythingFilterMessage = 'Click New Event to create your first point';
    this._futureFilterMessage = 'There are no future events now';
    this._pastFilterMessage = 'There are no past events now';
  }

  getTemplate(message) {
    return createEmptyTripElement(message);
  }

  getElement(currentFilter) {
    switch(currentFilter) {
      case 'Everything':
        this._element = createElement(createEmptyTripElement(this._everythingFilterMessage));
        return this._element;
      case 'Future':
        this._element = createElement(createEmptyTripElement(this._futureFilterMessage));
        return this._element;
      case 'Past':
        this._element = createElement(createEmptyTripElement(this._pastFilterMessage));
        return this._element;
    }
  }
}

