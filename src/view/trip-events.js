import { createElement } from '../utils/create-element.js';

const createTripEventsTemplate = () => ('<ul class="trip-events__list"></ul>');

export default class TripEvents {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsTemplate();
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
