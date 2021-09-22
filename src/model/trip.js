//import dayjs from 'dayjs';
import dayjs from 'dayjs';
import AbstractObserver from '../utils/abstract-observer.js';
import { calculateDuration, isEmptyEventsList } from '../utils/points.js';


const MAX_DISPLAYED_COUNT = 3;
const DEFAULT_TOTAL_COST = 0;

export default class Trip extends AbstractObserver{
  constructor() {
    super();
    this._points = null;
    this._destinations = null;
    this._offers = null;
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getPoints() {
    return this._points;
  }

  getDestinations() {
    return this._destinations;
  }

  getOffers() {
    return this._offers;
  }

  getRouteInfo() {
    if(!isEmptyEventsList(this._points)) {
      const FIRST_POINT = this._points[0];
      const LAST_POINT = this._points[this._points.length - 1];
      const [...cities] = new Set(this._points.map((element) => element.destination.name));

      return {
        cities: cities.length > MAX_DISPLAYED_COUNT ? `${FIRST_POINT.destination.name}&nbsp;&mdash;&#8228;&#8228;&#8228;&mdash;&nbsp;${LAST_POINT.destination.name}` : cities.join('&nbsp;&mdash;&nbsp;'),
        period: `${FIRST_POINT.eventDay}&nbsp;&mdash;&nbsp;${LAST_POINT.eventDay}`,
        totalCost: this._points.reduce((total, point) => total + point.price, DEFAULT_TOTAL_COST),
      };
    }
    return null;
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

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        price: point['base_price'],
        dateFrom: !(point.date_from === null) ? /* new Date(point.date_from) */ dayjs(point.date_from).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : point.date_from,
        dateTo: !(point.date_to === null) ? /* new Date(point.date_to) */ dayjs(point.date_to).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : point.date_to,
        isFavorite: point['is_favorite'],
        dispatchDate: dayjs(point.date_from).format('DD/MM/YY HH:mm'),
        dispatchTime: dayjs(point.date_from).format('HH:mm'),
        arrivalDate: dayjs(point.date_to).format('DD/MM/YY HH:mm'),
        arrivalTime: dayjs(point.date_to).format('HH:mm'),
        eventDay: dayjs(point.date_from).format('MMM DD'),
        dateClass: dayjs(point.date_from).format('YYYY-MM-DD'),
        dispatchTimeClass: dayjs(point.date_from).format('YYYY-MM-DDTHH:mm'),
        arrivalTimeClass: dayjs(point.date_to).format('YYYY-MM-DDTHH:mm'),
        duration: calculateDuration(dayjs(point.date_from), dayjs(point.date_to)),
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': point.price,
        'date_from': point.dateFrom instanceof dayjs ? point.dateFrom.toISOString() : null, // На сервере дата хранится в ISO формате
        'date_to': point.dateTo instanceof dayjs ? point.dateTo.toISOString() : null, // На сервере дата хранится в ISO формате
        'is_favorite': point.isFavorite,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.price;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.dispatchDate;
    delete adaptedPoint.dispatchTime;
    delete adaptedPoint.arrivalDate;
    delete adaptedPoint.arrivalTime;
    delete adaptedPoint.eventDay;
    delete adaptedPoint.dateClass;
    delete adaptedPoint.dispatchTimeClass;
    delete adaptedPoint.arrivalTimeClass;
    delete adaptedPoint.duration;

    return adaptedPoint;
  }
}
