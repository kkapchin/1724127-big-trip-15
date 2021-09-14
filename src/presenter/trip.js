import { render, RenderPosition } from '../utils/render.js';
import { getRouteInfo } from '../utils/points.js';
import AppMenuView from '../view/app-menu.js';
import AppFiltersView from '../view/app-filters.js';
import AppSortView from '../view/app-sort.js';
import EmptyTripView from '../view/empty-trip-events.js';
import TripInfoView from '../view/trip-info.js';
import RouteInfoView from '../view/route-info.js';
import TotalCostView from '../view/total-cost-info.js';

export default class Trip {
  constructor(bodyContainer) {
    this._DEFAULT_TOTAL_COST = 0;
    this._bodyContainer = bodyContainer;
    this._mainContainer = this._bodyContainer.querySelector('.trip-main');
    this._tripEventsContainer = this._bodyContainer.querySelector('.trip-events');

    this._appMenuComponent = new AppMenuView();
    this._appFiltersComponent = new AppFiltersView();
    this._appSortComponent = new AppSortView();
    this._emptyTripComponent = new EmptyTripView();
    this._tripInfoComponent = new TripInfoView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._routeInfo = getRouteInfo(this._tripEvents);
    this._renderTrip(this._tripEvents);
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
    render(this._tripEventsContainer, this._appSortComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderEmptyTrip() {
    render(this._tripEventsContainer, this._emptyTripComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    const totalCost = this._tripEvents.reduce((total, tripEvent) => total + tripEvent.price, this._DEFAULT_TOTAL_COST);
    render(this._mainContainer, this._tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent.getElement(), new RouteInfoView(this._routeInfo).getElement(), RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent.getElement(), new TotalCostView(totalCost).getElement(), RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    this._renderAppMenu();
    this._renderAppFilters();
    this._renderAppSort();
  }
}
