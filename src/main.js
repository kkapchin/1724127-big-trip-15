import { getPoints } from './mock/mocks.js';
//import FilterModel from './model/filter.js';
import TripModel from './model/trip.js';
import TripPresenter from './presenter/trip.js';
//import FilterPresenter from './presenter/filter.js';
//import MenuPresenter from './presenter/menu.js';
//import SortModel from './model/sort.js';
//import { MenuItem } from './const.js';
//import AppMenuView from './view/app-menu.js';
//import { render, RenderPosition } from './utils/render.js';

const TEMPORARY_POINTS_QUANTITY = 2;

const bodyContainer = document.querySelector('.page-body');
//const filterContainer = bodyContainer.querySelector('.trip-controls__filters');
const points = getPoints(TEMPORARY_POINTS_QUANTITY);

const tripModel = new TripModel();
//const filterModel = new FilterModel();
//const sortModel = new SortModel();

//const menuPresenter = new MenuPresenter(bodyContainer, tripModel, filterModel);
const tripPresenter = new TripPresenter(bodyContainer, tripModel);
//const filterPresenter = new FilterPresenter(filterContainer, tripModel, filterModel);

tripModel.setPoints(points);

//menuPresenter.render();
tripPresenter.render();
//filterPresenter.render();
