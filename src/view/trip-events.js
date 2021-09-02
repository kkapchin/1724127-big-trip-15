import { createNewPoint } from './route-point-form.js';
import { createRoutePointTemplate } from './route-point.js';

export const createTripEventsTemplate = (points) => {
  const startPoint = points.shift();
  return `<ul class="trip-events__list">
            ${createNewPoint(startPoint)}
            ${createRoutePointTemplate(points)}
          </ul>`;
};
