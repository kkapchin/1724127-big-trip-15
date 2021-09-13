import { createElement } from '../utils/create-element.js';

const createTotalCostTemplate = (value) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${value}</span>
  </p>`
);

export default class TotalCost {
  constructor(value) {
    this._totalCost = value;
    this._element = null;
  }

  getTemplate() {
    return createTotalCostTemplate(this._totalCost);
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
