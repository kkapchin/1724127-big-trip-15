import { FilterMessage, FilterType } from '../const.js';
import AbstractView from './abstract.js';

const createEmptyTripElement = (filterType) => {
  switch(filterType) {
    case FilterType.ALL:
      return `<p class="trip-events__msg">${FilterMessage.ALL}</p>`;
    case FilterType.FUTURE:
      return `<p class="trip-events__msg">${FilterMessage.FUTURE}</p>`;
    case FilterType.PAST:
      return `<p class="trip-events__msg">${FilterMessage.PAST}</p>`;
  }
};

export default class EmptyTrip extends AbstractView {
  constructor(currentFilterType) {
    super();
    this._currentFilterType = currentFilterType;
  }

  getTemplate() {
    return createEmptyTripElement(this._currentFilterType);
  }
}

