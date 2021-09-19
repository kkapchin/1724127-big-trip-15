import { getPoints } from './mock/mocks.js';
import FilterModel from './model/filter.js';
import TripModel from './model/trip.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

const TEMPORARY_POINTS_QUANTITY = 12;

const bodyElement = document.querySelector('.page-body');
const filterContainer = bodyElement.querySelector('.trip-controls__filters');
const points = getPoints(TEMPORARY_POINTS_QUANTITY);

const tripModel = new TripModel();
tripModel.setPoints(points);

const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(bodyElement, tripModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, tripModel, filterModel);

tripPresenter.render();
filterPresenter.render();
