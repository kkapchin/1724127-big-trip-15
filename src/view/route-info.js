import { createElement } from '../utils.js';

const createRouteInfoTemplate = (route) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${route.cities}</h1>
    <p class="trip-info__dates">${route.period}</p>
  </div>`
);

export default class RouteInfo {
  constructor(routeInfo) {
    this._routeInfo = routeInfo;
    this._element = null;
  }

  getTemplate() {
    return createRouteInfoTemplate(this._routeInfo);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
