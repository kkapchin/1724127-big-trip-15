import { getPoints } from './mock/trips.js';
import { render } from './utils/render.js';
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
const POINTS_QUANTITY = 15;
const points = getPoints(POINTS_QUANTITY);
const [...cities] = new Set(points.map((element) => element.destination.name));
const route = {
  cities: cities.join(' — '),
  dates: `${points[0].eventDay} — ${points[points.length - 1].eventDay}`,
};

render(appHeaderElement, createTripInfoTemplate(route), 'afterbegin');
render(appNavigationElement, createAppMenuTemplate(), 'beforeend');
render(appFiltersElement, createAppFiltersTemplate(), 'beforeend');
render(appEventsElement, createAppSortTemplate(), 'beforeend');
render(appEventsElement, createTripEventsTemplate(points), 'beforeend');
