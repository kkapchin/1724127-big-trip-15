import { createElement } from '../utils.js';
//import { createRouteInfoTemplate } from './route-info.js';
//import { createTotalCostTemplate } from './total-cost-info.js';

/* export const createTripInfoTemplate = (route) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${createRouteInfoTemplate(route)}
    </div>

    ${createTotalCostTemplate()}
  </section>`
); */

const createTripInfoTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
  </section>`
);

export default class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate();
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
