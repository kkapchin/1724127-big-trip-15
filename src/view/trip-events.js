import { createEditRoutePointTemplate } from './edit-route-point.js';
import { createRoutePointTemplate } from './route-point.js';

export const createTripEventsTemplate = () => (
  `<ul class="trip-events__list">
    ${createEditRoutePointTemplate()}
    ${createRoutePointTemplate()}
    ${createRoutePointTemplate()}
    ${createRoutePointTemplate()}
  </ul>`
);
