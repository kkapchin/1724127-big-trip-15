import { Checkbox, Disabled } from '../const.js';
import AbstractView from './abstract.js';

const FILTER_BUTTON_CLASS = 'trip-filters__filter-label';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {name, count} = filter;

  return `<div class="trip-filters__filter">
            <input
              id="filter-${name}"
              class="trip-filters__filter-input  visually-hidden"
              type="radio"
              name="trip-filter"
              value="${name}"
              ${name === currentFilterType ? Checkbox.TRUE : Checkbox.FALSE}
              ${count === 0 ? Disabled.TRUE : Disabled.FALSE}
            >
            <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
          </div>`;
};

const createFilterTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return `<form class="trip-filters" action="#" method="get">
            ${filterItemsTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class AppFilters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilterType);
  }

  setFiltersClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().addEventListener('click', this._filterClickHandler);
  }

  _filterClickHandler(event) {
    const filterType = event.target.textContent;
    const isDisabled = event.target.previousElementSibling.disabled;
    event.preventDefault();
    if((event.target.className === FILTER_BUTTON_CLASS) && !(this._currentFilterType === filterType)) {
      this._callback.filterClick(filterType, isDisabled);
    }
  }
}
