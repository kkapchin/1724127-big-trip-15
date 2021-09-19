import { CheckboxState, FilterType } from '../const.js';
import AbstractView from './abstract.js';

const FILTER_BUTTON_CLASS = 'trip-filters__filter-label';

const createAppFiltersTemplate = (filterType) => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${filterType === FilterType.ALL ? CheckboxState.TRUE : CheckboxState.FALSE}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${filterType === FilterType.FUTURE ? CheckboxState.TRUE : CheckboxState.FALSE}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${filterType === FilterType.PAST ? CheckboxState.TRUE : CheckboxState.FALSE}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class AppFilters extends AbstractView {
  constructor(currentFilterType) {
    super();
    this._currentFilterType = currentFilterType;

    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  getTemplate() {
    return createAppFiltersTemplate(this._currentFilterType);
  }

  setFiltersClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().addEventListener('click', this._filterClickHandler);
  }

  _filterClickHandler(event) {
    /* event.preventDefault();
    this._callback.filterClick(); */
    const filterType = event.target.textContent;
    event.preventDefault();
    if((event.target.className === FILTER_BUTTON_CLASS) && !(this._currentFilterType === filterType)) {
      /* const sibling = event.target.previousElementSibling;
      sibling.checked = !sibling.checked; */
      //this._currentFilterType = filterType;
      this._callback.filterClick(filterType);
    }
  }
}
