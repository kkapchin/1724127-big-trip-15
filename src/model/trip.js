import AbstractObserver from '../utils/abstract-observer.js';
//import { getRouteInfo } from '../utils/points.js';

const MAX_DISPLAYED_COUNT = 3;

export default class Trip extends AbstractObserver{
  constructor() {
    super();
    this._points = null;
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getPoints() {
    return this._points;
  }

  getRouteInfo() {
    const FIRST_POINT = this._points[0];
    const LAST_POINT = this._points[this._points.length - 1];
    const [...cities] = new Set(this._points.map((element) => element.destination.name));

    return {
      cities: cities.length > MAX_DISPLAYED_COUNT ? `${FIRST_POINT.destination.name}&nbsp;&mdash;&#8228;&#8228;&#8228;&mdash;&nbsp;${LAST_POINT.destination.name}` : cities.join('&nbsp;&mdash;&nbsp;'),
      period: `${FIRST_POINT.eventDay}&nbsp;&mdash;&nbsp;${LAST_POINT.eventDay}`,
    };
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
