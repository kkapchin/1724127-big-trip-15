import RoutePointView from '../view/route-point.js';
import RoutePointFormView from '../view/route-point-form.js';
import { render, RenderPosition, replace } from '../utils/render.js';
import { isEscEvent } from '../utils/keyboard-events.js';

/* const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
}; */

export default class Point {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;
    //this._changeData = changeData;
    //this._changeMode = changeMode;
  }

  render(tripEvent) {
    this._tripEvent = tripEvent;
    this._routePointComponent = new RoutePointView(this._tripEvent);
    this._routePointFormComponent = new RoutePointFormView(this._tripEvent);

    const documentKeydownHandler = (event) => {
      if(isEscEvent(event)) {
        event.preventDefault();
        replace(this._routePointComponent.getElement(), this._routePointFormComponent.getElement());
        document.removeEventListener('keydown', documentKeydownHandler);
      }
    };

    this._routePointComponent.setRollupClickHandler(() => {
      replace(this._routePointFormComponent.getElement(), this._routePointComponent.getElement());
      document.addEventListener('keydown', documentKeydownHandler);
    });
    this._routePointFormComponent.setRollupClickHandler(() => {
      replace(this._routePointComponent.getElement(), this._routePointFormComponent.getElement());
      document.removeEventListener('keydown', documentKeydownHandler);
    });
    this._routePointFormComponent.setSaveClickHandler(() => {
      replace(this._routePointComponent.getElement(), this._routePointFormComponent.getElement());
      document.removeEventListener('keydown', documentKeydownHandler);
    });
    render(this._eventListContainer, this._routePointComponent.getElement(), RenderPosition.BEFOREEND);
  }
}
