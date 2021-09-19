import { remove, render, RenderPosition } from '../utils/render.js';
import { isEmptyEventsList, SortBy } from '../utils/points.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import AppMenuView from '../view/app-menu.js';
import AppFiltersView from '../view/app-filters.js';
import AppSortView from '../view/app-sort.js';
import EmptyTripView from '../view/no-trip-events.js';
import TripInfoView from '../view/trip-info.js';
import RouteInfoView from '../view/route-info.js';
import TotalCostView from '../view/total-cost-info.js';
import PointPresenter from './point.js';
import TripEventsView from '../view/trip-events.js';
import NewEventBtnView from '../view/new-event.js';

const DEFAULT_TOTAL_COST = 0;

export default class Trip {
  constructor(bodyContainer, tripModel) {
    this._bodyContainer = bodyContainer;
    this._tripModel = tripModel;
    this._mainContainer = this._bodyContainer.querySelector('.trip-main');
    this._eventsContainer = this._bodyContainer.querySelector('.trip-events');
    this._pointPresenters = new Map();
    this._currentSortType = SortType.DAY;
    this._currentFilterType = FilterType.ALL;
    this._routeInfo = null;

    this._appMenuComponent = new AppMenuView();
    //this._appSortComponent = null;
    this._emptyTripComponent = new EmptyTripView();
    this._tripInfoComponent = new TripInfoView();
    this._eventsComponent = new TripEventsView();
    this._newEventBtnComponent = new NewEventBtnView();

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);
    this._handleNewEventBtnClick = this._handleNewEventBtnClick.bind(this);
    this._handleFilterClick = this._handleFilterClick.bind(this);

    this._tripModel.addObserver(this._handleModelEvent);
  }

  render() {
    this._renderTrip();
  }

  _getPoints() {
    switch(this._currentSortType) {
      case SortType.TIME:
        return this._tripModel.getPoints().slice().sort(SortBy.DURATION);
      case SortType.PRICE:
        return this._tripModel.getPoints().slice().sort(SortBy.PRICE);
    }
    return this._tripModel.getPoints();
  }

  _getRouteInfo() {
    return this._tripModel.getRouteInfo();
  }

  _renderAppMenu() {
    this._appMenuContainer = this._mainContainer.querySelector('.trip-controls__navigation');
    render(this._appMenuContainer, this._appMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderAppFilters() {
    this._appFiltersContainer = this._mainContainer.querySelector('.trip-controls__filters');
    this._appFiltersComponent = new AppFiltersView(this._currentFilterType);
    this._appFiltersComponent.setFiltersClickHandler(this._handleFilterClick);
    render(this._appFiltersContainer, this._appFiltersComponent, RenderPosition.BEFOREEND);
  }

  _renderAppSort() {
    /* if(this._appSortComponent) {
      this._appSortComponent = null;
    } */
    this._appSortComponent = new AppSortView(this._currentSortType);
    this._appSortComponent.setSortClickHandler(this._handleSortClick);
    render(this._eventsContainer, this._appSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEmptyTrip() {
    //this._emptyTripComponent.setEmpty
    render(this._eventsContainer, this._emptyTripComponent/* .getElement(DEFAULT_FILTER) */, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    if(this._routeInfo === null) {
      this._routeInfo = this._getRouteInfo();
    }
    const totalCost = this._getPoints().reduce((total, tripEvent) => total + tripEvent.price, DEFAULT_TOTAL_COST);
    render(this._mainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, new RouteInfoView(this._routeInfo), RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, new TotalCostView(totalCost), RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripEventsListContainer, this._handleViewAction, this._handleModeChange);
    pointPresenter.render(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPoints() {
    render(this._eventsContainer, this._eventsComponent, RenderPosition.BEFOREEND);
    this._tripEventsListContainer = this._eventsContainer.querySelector('.trip-events__list');
    this._getPoints().forEach((tripEvent) => this._renderPoint(tripEvent));
  }

  _renderTrip() {
    this._renderAppMenu();
    this._renderAppFilters();
    this._renderAppSort();
    this._renderNewEventBtn();
    if(isEmptyEventsList(this._getPoints())) {
      this._renderEmptyTrip();
      return;
    }
    this._renderTripInfo();
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

  _clearEventsList() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
    this._pointPresenters.clear();
    remove(this._eventsComponent);
  }

  /* _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenters.get(updatedPoint.id).render(updatedPoint);
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
      case UpdateType.MINOR:
        //this._clearEventsList();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: false, resetTripInfo: true});
        this._renderTrip();
        break;
      case UpdateType.FULL:
        this._clearTrip({resetSortType: true, resetTripInfo: true});
        this._renderTrip();
        break;
    }
  }

  _handleFilterClick(filterType) {
    this._currentFilterType = filterType;
    /* this._clearEventsList();
    this._renderPoints(); */
    this._clearTrip({resetSortType: true, resetTripInfo: true});
    this._renderTrip();
  }

  _clearTrip({resetSortType = false, resetTripInfo = false} = {}) {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
    this._pointPresenters.clear();

    remove(this._eventsComponent);
    remove(this._appMenuComponent);
    remove(this._appFiltersComponent);
    remove(this._appSortComponent);
    remove(this._newEventBtnComponent);
    remove(this._tripInfoComponent);

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
