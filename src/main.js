import dayjs from 'dayjs';
import { getPoints } from './mock/trips.js';
import { calculateDuration } from './utils/calculate-duration.js';
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
const data = getPoints(15);
const points = data.map((element) => (
  {
    price: element.basePrice,
    dispatchDate: dayjs(element.dateFrom).format('DD/MM/YY'),
    dispatchTime: dayjs(element.dateFrom).format('HH:mm'),
    arrivalDate: dayjs(element.dateTo).format('DD/MM/YY'),
    arrivalTime: dayjs(element.dateTo).format('HH:mm'),
    eventDay: dayjs(element.dateTo).format('MMM DD'),
    dateClass: dayjs(element.dateFrom).format('YYYY-MM-DD'),
    dispatchTimeClass: dayjs(element.dateFrom).format('YYYY-MM-DDTHH:mm'),
    arrivalTimeClass: dayjs(element.dateTo).format('YYYY-MM-DDTHH:mm'),
    duration: calculateDuration(element.dateFrom, element.dateTo),
    type: element.type,
    offers: element.offers,
    destination: element.destination,
  }
));

const [...cities] = new Set(data.map((element) => element.destination.name));
const route = cities.join(' — ');

render(appHeaderElement, createTripInfoTemplate(route), 'afterbegin');
render(appNavigationElement, createAppMenuTemplate(), 'beforeend');
render(appFiltersElement, createAppFiltersTemplate(), 'beforeend');
render(appEventsElement, createAppSortTemplate(), 'beforeend');
render(appEventsElement, createTripEventsTemplate(points), 'beforeend');
