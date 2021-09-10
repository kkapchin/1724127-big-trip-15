import { getPoints } from './mock/trips.js';
import { getRouteInfo, render, renderPosition } from './utils.js';
import AppFiltersView from './view/app-filters.js';
import AppMenuView from './view/app-menu.js';
import AppSortView from './view/app-sort.js';
import TripEventsView from './view/trip-events.js';
import TripInfoView from './view/trip-info.js';
import RouteInfoView from './view/route-info.js';
import RoutePointView from './view/route-point.js';
import RoutePointFormView from './view/route-point-form.js';

const appMainElement = document.querySelector('.page-body');
const appHeaderElement = appMainElement.querySelector('.trip-main');
const appNavigationElement = appHeaderElement.querySelector('.trip-controls__navigation');
const appFiltersElement = appHeaderElement.querySelector('.trip-controls__filters');
const appEventsElement = appMainElement.querySelector('.trip-events');
const points = getPoints(15);
const routeInfo = getRouteInfo(points);
const renderTripInfo = (data) => {
  const tripInfoComponent = new TripInfoView();
  render(appHeaderElement, tripInfoComponent.getElement(), renderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), new RouteInfoView(data).getElement(), renderPosition.AFTERBEGIN);
};
const renderTripEvents = (data) => {
  const tripEventsComponent = new TripEventsView();
  render(appEventsElement, tripEventsComponent.getElement(), renderPosition.BEFOREEND);

  data.forEach((point) => {
    const routePointComponent = new RoutePointView(point);
    const routePointFormComponent = new RoutePointFormView(point);
    const replaceItemToForm = () => {
      tripEventsComponent.getElement().replaceChild(routePointFormComponent.getElement(), routePointComponent.getElement());
    };

    const replaceFormToItem = () => {
      tripEventsComponent.getElement().replaceChild(routePointComponent.getElement(), routePointFormComponent.getElement());
    };

    routePointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', replaceItemToForm);
    routePointFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', replaceFormToItem);
    routePointFormComponent.getElement().querySelector('.event__save-btn').addEventListener('click', replaceFormToItem);
    render(tripEventsComponent.getElement(), routePointComponent.getElement(), renderPosition.BEFOREEND);
  });
};

render(appNavigationElement, new AppMenuView().getElement(), renderPosition.BEFOREEND);
render(appFiltersElement, new AppFiltersView().getElement(), renderPosition.BEFOREEND);
render(appEventsElement, new AppSortView().getElement(), renderPosition.AFTERBEGIN);
renderTripInfo(routeInfo);
renderTripEvents(points);
