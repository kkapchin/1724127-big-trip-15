import { getPoints } from './mock/mocks.js';
import { getRouteInfo, isEmptyEventsList } from './utils/points.js';
import { RenderPosition, render } from './utils/render.js';
import TripEventsView from './view/trip-events.js';
import TripInfoView from './view/trip-info.js';
import RouteInfoView from './view/route-info.js';
import RoutePointView from './view/route-point.js';
import RoutePointFormView from './view/route-point-form.js';
import EmptyTripView from './view/empty-trip-events.js';
import TotalCostView from './view/total-cost-info.js';
import { isEscEvent } from './utils/keyboard-events.js';

import TripPresenter from './presenter/trip.js';

const DEFAULT_TOTAL_COST = 0;
const appBodyElement = document.querySelector('.page-body');
const appHeaderElement = appBodyElement.querySelector('.trip-main');
const appEventsElement = appBodyElement.querySelector('.trip-events');
const points = getPoints(15);

const trip = new TripPresenter(appBodyElement);

const renderTripInfo = (tripEvents) => {
  const tripInfoComponent = new TripInfoView();
  const routeInfo = getRouteInfo(points);
  const totalCost = tripEvents.reduce((total, tripEvent) => total + tripEvent.price, DEFAULT_TOTAL_COST);
  render(appHeaderElement, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), new RouteInfoView(routeInfo).getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), new TotalCostView(totalCost).getElement(), RenderPosition.BEFOREEND);
};

const renderTripEvents = (tripEvents) => {
  const tripEventsComponent = new TripEventsView();
  render(appEventsElement, tripEventsComponent.getElement(), RenderPosition.BEFOREEND);

  tripEvents.forEach((tripEvent) => {
    const routePointComponent = new RoutePointView(tripEvent);
    const routePointFormComponent = new RoutePointFormView(tripEvent);

    const replaceElements = (newElement, currentElement) => {
      tripEventsComponent.getElement().replaceChild(newElement, currentElement);
    };

    const documentKeydownHandler = (event) => {
      if(isEscEvent(event)) {
        event.preventDefault();
        replaceElements(routePointComponent.getElement(), routePointFormComponent.getElement());
        document.removeEventListener('keydown', documentKeydownHandler);
      }
    };

    routePointComponent.setRollupClickHandler(() => {
      replaceElements(routePointFormComponent.getElement(), routePointComponent.getElement());
      document.addEventListener('keydown', documentKeydownHandler);
    });
    routePointFormComponent.setRollupClickHandler(() => {
      replaceElements(routePointComponent.getElement(), routePointFormComponent.getElement());
      document.removeEventListener('keydown', documentKeydownHandler);
    });
    routePointFormComponent.setSaveClickHandler(() => {
      replaceElements(routePointComponent.getElement(), routePointFormComponent.getElement());
      document.removeEventListener('keydown', documentKeydownHandler);
    });
    render(tripEventsComponent.getElement(), routePointComponent.getElement(), RenderPosition.BEFOREEND);
  });
};

trip.init(points);
if(!isEmptyEventsList(points)) {
  renderTripInfo(points);
  renderTripEvents(points);
} else {
  const DEFAULT_FILTER = 'Everything';
  render(appEventsElement, new EmptyTripView().getElement(DEFAULT_FILTER), RenderPosition.BEFOREEND);
}
