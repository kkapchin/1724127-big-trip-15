import AbstractObserver from '../utils/abstract-observer.js';


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
}
