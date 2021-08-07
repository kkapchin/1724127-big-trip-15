import { createRouteInfoTemplate } from './route-info.js';
import { createTotalCostTemplate } from './total-cost-info.js';

export const createTripInfoTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${createRouteInfoTemplate()}
    </div>

    ${createTotalCostTemplate()}
  </section>`
);
