import { getPoints } from './mock/trips.js';
import { getRouteInfo, renderElement, renderPosition, renderTemplate } from './utils.js';
import AppFiltersView from './view/app-filters.js';
import AppMenuView from './view/app-menu.js';
import AppSortView from './view/app-sort.js';
import { createTripEventsTemplate } from './view/trip-events.js';
import TripInfoView from './view/trip-info.js';
import RouteInfoView from './view/route-info.js';

const appMainElement = document.querySelector('.page-body');
const appHeaderElement = appMainElement.querySelector('.trip-main');
const appNavigationElement = appHeaderElement.querySelector('.trip-controls__navigation');
const appFiltersElement = appHeaderElement.querySelector('.trip-controls__filters');
const appEventsElement = appMainElement.querySelector('.trip-events');
const points = getPoints(15);
const routeInfo = getRouteInfo(points);
const tripInfoComponent = new TripInfoView();

renderElement(appHeaderElement, tripInfoComponent.getElement(), renderPosition.AFTERBEGIN);
renderElement(tripInfoComponent.getElement(), new RouteInfoView(routeInfo).getElement(), renderPosition.AFTERBEGIN);
renderElement(appNavigationElement, new AppMenuView().getElement(), renderPosition.BEFOREEND);
renderElement(appFiltersElement, new AppFiltersView().getElement(), renderPosition.BEFOREEND);
renderElement(appEventsElement, new AppSortView().getElement(), renderPosition.BEFOREEND);
renderTemplate(appEventsElement, createTripEventsTemplate(points), 'beforeend');
