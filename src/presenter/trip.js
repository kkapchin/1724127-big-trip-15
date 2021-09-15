import { remove, render, RenderPosition } from '../utils/render.js';
import { getRouteInfo, isEmptyEventsList } from '../utils/points.js';
import AppMenuView from '../view/app-menu.js';
import AppFiltersView from '../view/app-filters.js';
import AppSortView from '../view/app-sort.js';
import EmptyTripView from '../view/no-trip-events.js';
import TripInfoView from '../view/trip-info.js';
import RouteInfoView from '../view/route-info.js';
import TotalCostView from '../view/total-cost-info.js';
import PointPresenter from './point.js';
import TripEventsView from '../view/trip-events.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import NewEventBtnView from '../view/new-event.js';

const DEFAULT_TOTAL_COST = 0;
const DEFAULT_FILTER = 'Future';

export default class Trip {
  constructor(bodyContainer) {
    this._bodyContainer = bodyContainer;
    this._mainContainer = this._bodyContainer.querySelector('.trip-main');
    this._eventsContainer = this._bodyContainer.querySelector('.trip-events');
    this._pointPresenters = new Map();

    this._appMenuComponent = new AppMenuView();
    this._appFiltersComponent = new AppFiltersView();
    this._appSortComponent = new AppSortView();
    this._emptyTripComponent = new EmptyTripView();
    this._tripInfoComponent = new TripInfoView();
    this._eventsComponent = new TripEventsView();
    this._newEventBtnComponent = new NewEventBtnView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);
    this._handleNewEventBtnClick = this._handleNewEventBtnClick.bind(this);
  }

  render(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();
    this._renderTrip(this._points);
  }

  _renderAppMenu() {
    this._appMenuContainer = this._mainContainer.querySelector('.trip-controls__navigation');
    render(this._appMenuContainer, this._appMenuComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderAppFilters() {
    this._appFiltersContainer = this._mainContainer.querySelector('.trip-controls__filters');
    render(this._appFiltersContainer, this._appFiltersComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderAppSort() {
    this._appSortComponent.setSortClickHandler(this._handleSortClick);
    render(this._eventsContainer, this._appSortComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderEmptyTrip() {
    render(this._eventsContainer, this._emptyTripComponent.getElement(DEFAULT_FILTER), RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    this._routeInfo = getRouteInfo(this._points);
    const totalCost = this._points.reduce((total, tripEvent) => total + tripEvent.price, DEFAULT_TOTAL_COST);
    render(this._mainContainer, this._tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent.getElement(), new RouteInfoView(this._routeInfo).getElement(), RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent.getElement(), new TotalCostView(totalCost).getElement(), RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripEventsListContainer, this._handlePointChange, this._handleModeChange);
    pointPresenter.render(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPoints() {
    render(this._eventsContainer, this._eventsComponent.getElement(), RenderPosition.BEFOREEND);
    this._tripEventsListContainer = this._eventsContainer.querySelector('.trip-events__list');
    this._points
      .slice()
      .forEach((tripEvent) => this._renderPoint(tripEvent));
  }

  _renderTrip() {
    this._renderAppMenu();
    this._renderAppFilters();
    this._renderAppSort();
    this._renderNewEventBtn();
    if(isEmptyEventsList(this._points)) {
      this._renderEmptyTrip();
      return;
    }
    this._renderTripInfo();
    this._renderPoints();
  }

  _renderNewEventBtn() {
    this._newEventBtnComponent.setNewEventBtnClickHandler(this._handleNewEventBtnClick);
    render(this._mainContainer, this._newEventBtnComponent.getElement(), RenderPosition.BEFOREEND);
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

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenters.get(updatedPoint.id).render(updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleSortClick(sortType) {
    if(sortType === SortType.EVENT || sortType === SortType.OFFERS) {
      return;
    }
    this._sortPoints(sortType);
    this._clearEventsList();
    this._renderPoints();
  }

  _sortPoints(sortType) {
    switch(sortType) {
      case SortType.TIME:
        this._points.sort((a, b) => a.duration.total < b.duration.total);
        break;
      case SortType.PRICE:
        this._points.sort((a, b) => a.price < b.price);
        break;
      case SortType.DAY:
        this._points = this._points = this._sourcedPoints.slice();
    }
  }
}
