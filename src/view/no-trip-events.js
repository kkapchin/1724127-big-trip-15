import { FilterMessage, FilterType } from '../const.js';
import { createElement } from '../utils/render.js';
import AbstractView from './abstract.js';

const createEmptyTripElement = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class EmptyTrip extends AbstractView {
  constructor(currentFilterType) {
    super();
    this._currentFilterType = currentFilterType;
  }

  getTemplate() {
    return createEmptyTripElement(this._message);
  }

  getElement() {
    switch(this._currentFilterType) {
      case FilterType.ALL:
        this._message = FilterMessage.ALL;
        return createElement(this.getTemplate());
      case FilterType.FUTURE:
        this._message = FilterMessage.FUTURE;
        return createElement(this.getTemplate());
      case FilterType.PAST:
        this._message = FilterMessage.PAST;
        return createElement(this.getTemplate());
    }
  }
}

