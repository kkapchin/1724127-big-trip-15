import { FilterType, SortType } from '../const.js';
import AbstractObserver from '../utils/abstract-observer.js';
import { SortBy } from '../utils/points.js';


const MAX_DISPLAYED_COUNT = 3;
const DEFAULT_TOTAL_COST = 0;

export default class Trip extends AbstractObserver{
  constructor() {
    super();
    this._points = null;
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getPoints(sortType, filterType) {
    switch(sortType) {
      case SortType.TIME:
        return this._points.slice().sort(SortBy.DURATION);
      case SortType.PRICE:
        return this._points.slice().sort(SortBy.PRICE);
    }
    switch(filterType) {
      case FilterType.ALL:
        return this._points.slice().sort(SortBy.DEFAULT);
      case FilterType.FUTURE:
        return this._points.filter(SortBy.FILTER.FUTURE);
      case FilterType.PAST:
        return this._points.filter(SortBy.FILTER.PAST);
    }
  }

  getRouteInfo() {
    const FIRST_POINT = this._points[0];
    const LAST_POINT = this._points[this._points.length - 1];
    const [...cities] = new Set(this._points.map((element) => element.destination.name));

    return {
      cities: cities.length > MAX_DISPLAYED_COUNT ? `${FIRST_POINT.destination.name}&nbsp;&mdash;&#8228;&#8228;&#8228;&mdash;&nbsp;${LAST_POINT.destination.name}` : cities.join('&nbsp;&mdash;&nbsp;'),
      period: `${FIRST_POINT.eventDay}&nbsp;&mdash;&nbsp;${LAST_POINT.eventDay}`,
      totalCost: this._points.reduce((total, point) => total + point.price, DEFAULT_TOTAL_COST),
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
