import { remove, render, RenderPosition } from '../utils/render.js';
import { isEmptyEventsList, SortBy } from '../utils/points.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import SortView from '../view/sort.js';
import EmptyTripView from '../view/no-trip-events.js';
import TripInfoView from '../view/trip-info.js';
import RouteInfoView from '../view/route-info.js';
import TotalCostView from '../view/total-cost.js';
import TripEventsView from '../view/trip-events.js';
//import NewPointBtnView from '../view/new-point.js';
import { filter } from '../utils/filter.js';
import PointPresenter from './point.js';
import NewPointPresenter from './new-point.js';
import MenuPresenter from './menu.js';
import FilterModel from '../model/filter.js';
import FilterPresenter from './filter.js';
import SortModel from '../model/sort.js';

export default class Trip {
  constructor(bodyContainer, tripModel) {
    this._bodyContainer = bodyContainer;
    this._filterContainer = this._bodyContainer.querySelector('.trip-controls__filters');

    this._tripModel = tripModel;
    this._filterModel = new FilterModel();
    this._sortModel = new SortModel();

    this._menuPresenter = new MenuPresenter(this._bodyContainer, this._tripModel, this._filterModel);
    this._filterPresenter = new FilterPresenter(this._filterContainer, this._tripModel, this._filterModel);
    //this._sortPresenter

    this._currentSortType = SortType.DAY;
    this._currentFilterType = FilterType.ALL;
    this._routeInfo = null;
    this._pointPresenters = new Map();

    this._mainContainer = this._bodyContainer.querySelector('.trip-main');
    this._eventsContainer = this._bodyContainer.querySelector('.trip-events');

    this._appSortComponent = null;
    this._emptyTripComponent = null;
    this._tripInfoComponent = new TripInfoView();
    this._eventsComponent = new TripEventsView();

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);

    this._tripModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._sortModel.addObserver(this._handleModelEvent);

    this._newPointPresenter = new NewPointPresenter(this._eventsComponent, this._handleViewAction);
    this._menuPresenter = new MenuPresenter(this._bodyContainer);
  }

  render() {
    this._renderTrip();
  }

  createPoint() {
    const newPointPresenter = new NewPointPresenter(this._eventsContainer);
    this._sortModel.setSort(UpdateType.NONE, SortType.DAY);
    this._filterModel.setFilter(UpdateType.FILTER, FilterType.ALL);
    newPointPresenter.render();
  }

  _getPoints() {
    this._currentFilterType = this._filterModel.getFilter();
    this._currentSortType = this._sortModel.getSort();

    const points = this._tripModel.getPoints();
    const filteredPoints = filter[this._currentFilterType](points);

    switch(this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(SortBy.DURATION);
      case SortType.PRICE:
        return filteredPoints.sort(SortBy.PRICE);
    }

    return filteredPoints;
  }

  _getRouteInfo() {
    return this._tripModel.getRouteInfo();
  }

  _renderMenu() {
    this._menuPresenter.render();
  }

  _renderFilter() {
    this._filterPresenter.render();
  }

  _renderSort() {
    if(this._appSortComponent) {
      this._appSortComponent = null;
    }
    this._appSortComponent = new SortView(this._currentSortType);
    this._appSortComponent.setSortClickHandler(this._handleSortClick);
    render(this._eventsContainer, this._appSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEmptyTrip() {
    this._emptyTripComponent = new EmptyTripView(this._currentFilterType);
    render(this._eventsContainer, this._emptyTripComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    if(this._routeInfo === null) {
      this._routeInfo = this._getRouteInfo();
    }
    if(!(this._routeInfo === null)) {
      render(this._mainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      render(this._tripInfoComponent, new RouteInfoView(this._routeInfo), RenderPosition.AFTERBEGIN);
      render(this._tripInfoComponent, new TotalCostView(this._routeInfo.totalCost), RenderPosition.BEFOREEND);
    }
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripEventsListContainer, this._handleViewAction, this._handleModeChange);
    pointPresenter.render(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPoints() {
    render(this._eventsContainer, this._eventsComponent, RenderPosition.BEFOREEND);
    this._tripEventsListContainer = this._eventsContainer.querySelector('.trip-events__list');
    this._getPoints().forEach((point) => this._renderPoint(point));
  }

  _renderTrip() {
    this._renderMenu();
    this._renderFilter();
    this._renderTripInfo();
    if(isEmptyEventsList(this._getPoints())) {
      this._renderEmptyTrip();
      return;
    }
    this._renderSort();
    this._renderPoints();
  }

  /* _renderNewPointBtn() {
    this._newPointBtnComponent.setNewPointBtnClickHandler(this._handleNewPointBtnClick);
    render(this._mainContainer, this._newPointBtnComponent, RenderPosition.BEFOREEND);
  } */

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this._tripModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._tripModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._tripModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent (updateType, data) {
    switch(updateType) {
      case UpdateType.NONE:
        break;
      case UpdateType.PATCH:
        this._pointPresenters.get(data.id).render(data);
        break;
      case UpdateType.SAVE:
      case UpdateType.SORT:
        this._clearTrip({resetSortType: false, resetTripInfo: true});
        this._renderTrip();
        break;
      case UpdateType.FILTER:
        this._clearTrip({resetSortType: true, resetTripInfo: false});
        this._renderTrip();
        break;
      case UpdateType.FULL:
        this._clearTrip({resetSortType: true, resetTripInfo: true});
        this._renderTrip();
        break;
    }
  }

  _clearTrip({resetSortType = false, resetTripInfo = false} = {}) {
    this._newPointPresenter.destroy();
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();

    if(this._emptyTripComponent) {
      remove(this._emptyTripComponent);
    }

    remove(this._eventsComponent);
    remove(this._tripInfoComponent);

    if(this._appSortComponent) {
      remove(this._appSortComponent);
    }

    if(resetTripInfo) {
      this._routeInfo = this._getRouteInfo();
    }

    if(resetSortType) {
      this._sortModel.setSort(UpdateType.NONE, SortType.DAY);
    }
  }

  _handleModeChange() {
    this._newPointPresenter.destroy();
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleSortClick(sortType) {
    if(sortType === SortType.EVENT || sortType === SortType.OFFERS) {
      return;
    }
    this._sortModel.setSort(UpdateType.SORT, sortType);
  }
}
