import { UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import { remove, render, RenderPosition, replace } from '../utils/render.js';
import FilterView from '../view/filter.js';

export default class Filter {
  constructor(filterContainer, tripModel, filterModel) {
    this._filterContainer = filterContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;

    this._filterComponent = null;

    this._handleFilterClick = this._handleFilterClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  render() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFiltersClickHandler(this._handleFilterClick);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _getFilters() {
    const points = this._tripModel.getPoints();
    if(!points) {
      return [];
    }

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
