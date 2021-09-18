import { getPoints } from './mock/mocks.js';
import TripModel from './model/trip.js';
import TripPresenter from './presenter/trip.js';

const TEMPORARY_POINTS_QUANTITY = 15;

const appBodyElement = document.querySelector('.page-body');
const points = getPoints(TEMPORARY_POINTS_QUANTITY);

const tripModel = new TripModel();
const tripPresenter = new TripPresenter(appBodyElement, tripModel);

tripModel.setPoints(points);
tripPresenter.render();
