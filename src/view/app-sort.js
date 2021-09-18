import { SortType } from '../const.js';
import AbstractView from './abstract.js';

const SORT_BUTTON_CLASS = 'trip-sort__btn';

const createAppSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

export default class AppSort extends AbstractView {
  constructor() {
    super();
    this._sortClickHandler = this._sortClickHandler.bind(this);
    this._currentSortType = SortType.DAY;
  }

  getTemplate() {
    return createAppSortTemplate();
  }

  setSortClickHandler(callback) {
    this._callback.sortClick = callback;
    this.getElement().addEventListener('click', this._sortClickHandler);
  }

  _sortClickHandler(event) {
    const sortType = event.target.textContent;
    event.preventDefault();
    if((event.target.className === SORT_BUTTON_CLASS) && !(this._currentSortType === sortType)) {
      const sibling = event.target.previousElementSibling;
      if(!(sortType === SortType.EVENT) && !(sortType === SortType.OFFERS)) {
        sibling.checked = !sibling.checked;
      }
      this._currentSortType = sortType;
      this._callback.sortClick(sortType);
    }
  }
}
