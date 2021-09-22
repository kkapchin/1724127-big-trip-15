import TripModel from './model/trip.js';
import TripPresenter from './presenter/trip.js';
import Api from './api.js';
import { UpdateType } from './const.js';

const AUTHORIZATION = 'Basic kTy9gIdsz2317rD';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const bodyContainer = document.querySelector('.page-body');

const api =  new Api(END_POINT, AUTHORIZATION);
const tripModel = new TripModel();
const tripPresenter = new TripPresenter(bodyContainer, tripModel, api);


tripPresenter.render();

api.getOffers()
  .then((offers) => {
    tripModel.setOffers(offers);
  })
  .catch(() => {
    tripModel.setOffers([]);
  });

api.getDestinations()
  .then((destinations) => {
    tripModel.setDestinations(destinations);
  })
  .catch(() => {
    tripModel.setDestinations([]);
  });

api.getPoints()
  .then((points) => {
    tripModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    tripModel.setPoints(UpdateType.INIT, []);
  });


