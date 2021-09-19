import { remove, render, RenderPosition } from '../utils/render.js';
import { isEmptyEventsList, SortBy } from '../utils/points.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import AppMenuView from '../view/app-menu.js';
//import AppFiltersView from '../view/app-filters.js';
import AppSortView from '../view/app-sort.js';
import EmptyTripView from '../view/no-trip-events.js';
import TripInfoView from '../view/trip-info.js';
import RouteInfoView from '../view/route-info.js';
import TotalCostView from '../view/total-cost-info.js';
import PointPresenter from './point.js';
import TripEventsView from '../view/trip-events.js';
import NewEventBtnView from '../view/new-event.js';
import { filter } from '../utils/filter.js';

export default class Trip {
  constructor(bodyContainer, tripModel, filterModel) {
    this._bodyContainer = bodyContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;
    this._mainContainer = this._bodyContainer.querySelector('.trip-main');
    this._eventsContainer = this._bodyContainer.querySelector('.trip-events');
    this._pointPresenters = new Map();
    this._currentSortType = SortType.DAY;
    this._currentFilterType = FilterType.ALL;
    this._routeInfo = null;

    this._appMenuComponent = new AppMenuView();
    this._appSortComponent = null;
    this._emptyTripComponent = null;
    this._tripInfoComponent = new TripInfoView();
    this._eventsComponent = new TripEventsView();
    this._newEventBtnComponent = new NewEventBtnView();

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);
    this._handleNewEventBtnClick = this._handleNewEventBtnClick.bind(this);
    //this._handleFilterClick = this._handleFilterClick.bind(this);

    this._tripModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  render() {
    this._renderTrip();
  }

  _getPoints() {
    this._currentFilterType = this._filterModel.getFilter();
    const points = this._tripModel.getPoints();
    const filteredPoints = filter[this._currentFilterType](points);

    switch(this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(SortBy.DURATION);
      case SortType.PRICE:
        return filteredPoints.sort(SortBy.PRICE);
    }

    return filteredPoints;
    /* switch(this._currentFilterType) {
      case FilterType.ALL:
        return this._points.slice().sort(SortBy.DEFAULT);
      case FilterType.FUTURE:
        return this._points.filter(SortBy.FILTER.FUTURE);
      case FilterType.PAST:
        return this._points.filter(SortBy.FILTER.PAST);
    } */
  }

  _getRouteInfo() {
    return this._tripModel.getRouteInfo();
  }

  _renderAppMenu() {
    this._appMenuContainer = this._mainContainer.querySelector('.trip-controls__navigation');
    render(this._appMenuContainer, this._appMenuComponent, RenderPosition.BEFOREEND);
  }

  /* _renderAppFilters() {
    this._appFiltersContainer = this._mainContainer.querySelector('.trip-controls__filters');

    const enabledFilters = {
      FUTURE: this._getPoints().filter(SortBy.FILTER.FUTURE).length > 0,
      PAST: this._getPoints().filter(SortBy.FILTER.PAST).length > 0,
    };
    this._appFiltersComponent = new AppFiltersView(this._filterModel.getFilter());
    this._appFiltersComponent.setFiltersClickHandler(this._handleFilterClick);
    render(this._appFiltersContainer, this._appFiltersComponent, RenderPosition.BEFOREEND);
  } */

  _renderAppSort() {
    if(this._appSortComponent) {
      this._appSortComponent = null;
    }
    this._appSortComponent = new AppSortView(this._currentSortType);
    this._appSortComponent.setSortClickHandler(this._handleSortClick);
    render(this._eventsContainer, this._appSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEmptyTrip() {
    /* if(this._emptyTripComponent) {
      this._emptyTripComponent = null;
    } */
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
    this._renderAppMenu();
    //this._renderAppFilters();
    this._renderNewEventBtn();
    this._renderTripInfo();
    if(isEmptyEventsList(this._getPoints())) {
      this._renderEmptyTrip();
      return;
    }
    this._renderAppSort();
    this._renderPoints();
  }

  _renderNewEventBtn() {
    this._newEventBtnComponent.setNewEventBtnClickHandler(this._handleNewEventBtnClick);
    render(this._mainContainer, this._newEventBtnComponent, RenderPosition.BEFOREEND);
  }

  _handleNewEventBtnClick(event) {
    event.target.disabled = !event.target.disabled;
    //remove(this._eventsComponent);
    //remove(this._emptyTripComponent);
  }

  /* _clearEventsList() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
    this._pointPresenters.clear();
    remove(this._eventsComponent);
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
      case UpdateType.PATCH:
        this._pointPresenters.get(data.id).render(data);
        break;
      case UpdateType.MAJOR:
        //this._clearEventsList();
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
    this._pointPresenters.forEach((presenter) => presenter.resetView());
    //this._pointPresenters.forEach((presenter) => presenter.removeElement());
    this._pointPresenters.clear();

    if(this._emptyTripComponent) {
      remove(this._emptyTripComponent);
    }

    remove(this._eventsComponent);
    remove(this._appMenuComponent);
    //remove(this._appFiltersComponent);
    remove(this._newEventBtnComponent);
    remove(this._tripInfoComponent);

    if(this._appSortComponent) {
      remove(this._appSortComponent);
    }

    if(resetTripInfo) {
      this._routeInfo = this._getRouteInfo();
    }

    if(resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleSortClick(sortType) {
    if(sortType === SortType.EVENT || sortType === SortType.OFFERS) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }
}
