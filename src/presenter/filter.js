import { UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/filter';
import { remove, render, RenderPosition, replace } from '../utils/render';
import FilterView from '../view/filter.js';

export default class Filter {
  constructor(filterContainer, tripModel, filterModel) {
    this._filterContainer = filterContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;

    this._filtersComponent = null;

    this._handleFilterClick = this._handleFilterClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  render() {
    const filters = this._getFilters();
    const prevFiltersComponent = this._filtersComponent;

    this._filtersComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filtersComponent.setFiltersClickHandler(this._handleFilterClick);

    if (prevFiltersComponent === null) {
      render(this._filterContainer, this._filtersComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  _getFilters() {
    const points = this._tripModel.getPoints();

    return [
      {
        name: FilterType.ALL,
        count: filter[FilterType.ALL](points).length,
      },
      {
        name: FilterType.FUTURE,
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        name: FilterType.PAST,
        count: filter[FilterType.PAST](points).length,
      },
    ];
  }

  _handleModelEvent () {
    this.render();
  }

  _handleFilterClick(filterType, isDisabled) {
    if(this._filterModel.getFilter() === filterType) {
      return;
    }

    if(isDisabled) {
      return;
    }

    this._filterModel.setFilter(UpdateType.FILTER, filterType);
  }
}
