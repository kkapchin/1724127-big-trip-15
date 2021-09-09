import { getPoints } from './mock/trips.js';
import { getRouteInfo, renderTemplate } from './utils.js';
import { createAppFiltersTemplate } from './view/app-filters.js';
import { createAppMenuTemplate } from './view/app-menu.js';
import { createAppSortTemplate } from './view/app-sort.js';
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
renderTemplate(appNavigationElement, createAppMenuTemplate(), 'beforeend');
renderTemplate(appFiltersElement, createAppFiltersTemplate(), 'beforeend');
renderTemplate(appEventsElement, createAppSortTemplate(), 'beforeend');
renderTemplate(appEventsElement, createTripEventsTemplate(points), 'beforeend');
