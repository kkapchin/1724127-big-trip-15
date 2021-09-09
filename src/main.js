import { getPoints } from './mock/trips.js';
import { getRouteInfo, renderPosition, renderTemplate } from './utils.js';
import AppFiltersView from './view/app-filters.js';
import AppMenuView from './view/app-menu.js';
import AppSortView from './view/app-sort.js';
import { createTripEventsTemplate } from './view/trip-events.js';
import { createTripInfoTemplate } from './view/trip-info.js';

const appMainElement = document.querySelector('.page-body');
const appHeaderElement = appMainElement.querySelector('.trip-main');
const appNavigationElement = appHeaderElement.querySelector('.trip-controls__navigation');
const appFiltersElement = appHeaderElement.querySelector('.trip-controls__filters');
const appEventsElement = appMainElement.querySelector('.trip-events');
const points = getPoints(15);
const routeInfo = getRouteInfo(points);

renderTemplate(appHeaderElement, createTripInfoTemplate(routeInfo), 'afterbegin');
renderTemplate(appNavigationElement, new AppMenuView().getElement(), renderPosition.BEFOREEND);
renderTemplate(appFiltersElement, new AppFiltersView().getElement(), renderPosition.BEFOREEND);
renderTemplate(appEventsElement, new AppSortView().getElement(), renderPosition.BEFOREEND);
renderTemplate(appEventsElement, createTripEventsTemplate(points), 'beforeend');
