import { getPoints } from './mock/trips.js';
import { getRouteInfo } from './utils/get-route-info.js';
import { render } from './utils/render.js';
import { renderPosition } from './utils/render-position.js';
import AppFiltersView from './view/app-filters.js';
import AppMenuView from './view/app-menu.js';
import AppSortView from './view/app-sort.js';
import TripEventsView from './view/trip-events.js';
import TripInfoView from './view/trip-info.js';
import RouteInfoView from './view/route-info.js';
import RoutePointView from './view/route-point.js';
import RoutePointFormView from './view/route-point-form.js';
import EmptyTripView from './view/empty-trip-events.js';
import TotalCostView from './view/total-cost-info.js';
import { isEscEvent } from './utils/is-escape-event.js';
import { isEmptyEventsList } from './utils/is-empty-events-list.js';

const appMainElement = document.querySelector('.page-body');
const appHeaderElement = appMainElement.querySelector('.trip-main');
const appNavigationElement = appHeaderElement.querySelector('.trip-controls__navigation');
const appFiltersElement = appHeaderElement.querySelector('.trip-controls__filters');
const appEventsElement = appMainElement.querySelector('.trip-events');
const points = getPoints(15);

const renderTripInfo = (tripEvents) => {
  const tripInfoComponent = new TripInfoView();
  const routeInfo = getRouteInfo(points);
  const DEFAULT_TOTAL_COST = 0;
  const totalCost = tripEvents.reduce((total, tripEvent) => total + tripEvent.price, DEFAULT_TOTAL_COST);
  render(appHeaderElement, tripInfoComponent.getElement(), renderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), new RouteInfoView(routeInfo).getElement(), renderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), new TotalCostView(totalCost).getElement(), renderPosition.BEFOREEND);
};

const renderTripEvents = (tripEvents) => {
  const tripEventsComponent = new TripEventsView();
  render(appEventsElement, tripEventsComponent.getElement(), renderPosition.BEFOREEND);

  tripEvents.forEach((point) => {
    const routePointComponent = new RoutePointView(point);
    const routePointFormComponent = new RoutePointFormView(point);

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
    render(tripEventsComponent.getElement(), routePointComponent.getElement(), renderPosition.BEFOREEND);
  });
};

render(appNavigationElement, new AppMenuView().getElement(), renderPosition.BEFOREEND);
render(appFiltersElement, new AppFiltersView().getElement(), renderPosition.BEFOREEND);
render(appEventsElement, new AppSortView().getElement(), renderPosition.AFTERBEGIN);
if(!isEmptyEventsList(points)) {
  renderTripInfo(points);
  renderTripEvents(points);
} else {
  const DEFAULT_FILTER = 'Everything';
  render(appEventsElement, new EmptyTripView().getElement(DEFAULT_FILTER), renderPosition.BEFOREEND);
}
