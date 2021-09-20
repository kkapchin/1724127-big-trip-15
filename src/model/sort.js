import { SortType } from '../const';
import AbstractObserver from '../utils/abstract-observer.js';

export default class Sort extends AbstractObserver {
  constructor() {
    super();
    this._activeSort = SortType.DAY;
  }

  setSort(updateType, sort) {
    this._activeSort = sort;
    this._notify(updateType, sort);
  }

  getSort() {
    return this._activeSort;
  }
}
