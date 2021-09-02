import { createRouteInfoTemplate } from './route-info.js';
import { createTotalCostTemplate } from './total-cost-info.js';

export const createTripInfoTemplate = (route) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${createRouteInfoTemplate(route)}
    </div>

    ${createTotalCostTemplate()}
  </section>`
);
