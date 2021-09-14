import AbstractView from './abstract.js';

const createRouteInfoTemplate = (route) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${route.cities}</h1>
    <p class="trip-info__dates">${route.period}</p>
  </div>`
);

export default class RouteInfo extends AbstractView {
  constructor(routeInfo) {
    super();
    this._routeInfo = routeInfo;
  }

  getTemplate() {
    return createRouteInfoTemplate(this._routeInfo);
  }
}
