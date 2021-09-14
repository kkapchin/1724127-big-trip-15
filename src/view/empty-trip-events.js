import { createElement } from '../utils/render.js';
import AbstractView from './abstract.js';

const createEmptyTripElement = (value) => `<p class="trip-events__msg">${value}</p>`;

export default class EmptyTrip extends AbstractView {
  constructor() {
    super();
    this._everythingFilterMessage = 'Click New Event to create your first point';
    this._futureFilterMessage = 'There are no future events now';
    this._pastFilterMessage = 'There are no past events now';
    this._FilterType = {
      EVERYTHING: 'Everything',
      FUTURE: 'Future',
      PAST: 'Past',
    };
  }

  getTemplate(message) {
    return createEmptyTripElement(message);
  }

  getElement(currentFilter) {
    switch(currentFilter) {
      case this._FilterType.EVERYTHING:
        this._element = createElement(createEmptyTripElement(this._everythingFilterMessage));
        return this._element;
      case this._FilterType.FUTURE:
        this._element = createElement(createEmptyTripElement(this._futureFilterMessage));
        return this._element;
      case this._FilterType.PAST:
        this._element = createElement(createEmptyTripElement(this._pastFilterMessage));
        return this._element;
    }
  }
}

