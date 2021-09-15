import pointView from '../view/route-point.js';
import pointFormView from '../view/route-point-form.js';
import { remove, render, RenderPosition, replace } from '../utils/render.js';
import { isEscEvent } from '../utils/keyboard-events.js';

/* const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
}; */

export default class Point {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;
    this._prevPointComponent = null;
    this._prevPointFormComponent = null;
    //this._changeData = changeData;
    //this._changeMode = changeMode;

    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
    this._handleFormRollupClick = this._handleFormRollupClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  render(tripEvent) {
    this._point = tripEvent;

    const prevPointComponent = this._prevPointComponent;
    const prevPointFormComponent = this._prevPointFormComponent;

    this._pointComponent = new pointView(this._point);
    this._pointFormComponent = new pointFormView(this._point);

    this._pointComponent.setRollupClickHandler(this._handleRollupClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointFormComponent.setRollupClickHandler(this._handleFormRollupClick);
    this._pointFormComponent.setSaveClickHandler(this._handleSaveClick);

    if(prevPointComponent === null || prevPointFormComponent === null) {
      render(this._eventListContainer, this._pointComponent.getElement(), RenderPosition.BEFOREEND);
      return;
    }

    if(this._eventListContainer.contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if(this._eventListContainer.contains(prevPointFormComponent.getElement())) {
      replace(this._pointFormComponent, prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointFormComponent);
  }

  _handleRollupClick() {
    replace(this._pointFormComponent.getElement(), this._pointComponent.getElement());
    document.addEventListener('keydown', this._documentKeydownHandler);
  }

  _documentKeydownHandler(event) {
    if(isEscEvent(event)) {
      event.preventDefault();
      replace(this._pointComponent.getElement(), this._pointFormComponent.getElement());
      document.removeEventListener('keydown', this._documentKeydownHandler);
    }
  }

  _handleFormRollupClick() {
    replace(this._pointComponent.getElement(), this._pointFormComponent.getElement());
    document.removeEventListener('keydown', this._documentKeydownHandler);
  }

  _handleSaveClick() {
    replace(this._pointComponent.getElement(), this._pointFormComponent.getElement());
    document.removeEventListener('keydown', this._documentKeydownHandler);
  }

  _handleFavoriteClick() {
    //
  }
}
