import AbstractView from './abstract.js';

const createTotalCostTemplate = (value) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${value}</span>
  </p>`
);

export default class TotalCost extends AbstractView {
  constructor(value) {
    super();
    this._totalCost = value;
  }

  getTemplate() {
    return createTotalCostTemplate(this._totalCost);
  }
}
