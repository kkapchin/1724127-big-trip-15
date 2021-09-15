import { getPoints } from './mock/mocks.js';
import TripPresenter from './presenter/trip.js';

const TEMPORARY_POINTS_QUANTITY = 15;
const appBodyElement = document.querySelector('.page-body');
const points = getPoints(TEMPORARY_POINTS_QUANTITY);
const trip = new TripPresenter(appBodyElement);

trip.render(points);
console.log(points)
