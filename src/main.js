import { render } from './utils/render.js';
import { createAppFiltersTemplate } from './view/app-filters.js';
import { createAppMenuTemplate } from './view/app-menu.js';
import { createAppSortTemplate } from './view/app-sort.js';
import { createTripInfoTemplate } from './view/trip-info.js';

const appMainElement = document.querySelector('.page-body');
const appHeaderElement = appMainElement.querySelector('.trip-main');
const appNavigationElement = appHeaderElement.querySelector('.trip-controls__navigation');
const appFiltersElement = appHeaderElement.querySelector('.trip-controls__filters');
const appEventsElement = appMainElement.querySelector('.trip-events');

render(appHeaderElement, createTripInfoTemplate(), 'afterbegin');
render(appNavigationElement, createAppMenuTemplate(), 'beforeend');
render(appFiltersElement, createAppFiltersTemplate(), 'beforeend');
render(appEventsElement, createAppSortTemplate(), 'beforeend');
