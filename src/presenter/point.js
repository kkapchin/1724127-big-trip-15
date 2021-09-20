import pointView from '../view/point.js';
import pointFormView from '../view/point-form.js';
import { remove, render, RenderPosition, replace } from '../utils/render.js';
import { isEscEvent } from '../utils/keyboard-events.js';
import { UpdateType, UserAction } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  FORM: 'FORM',
};

export default class Point {
  constructor(eventListContainer, updateView, changeMode) {
    this._eventListContainer = eventListContainer;
    this._updateView = updateView;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
    this._handleFormRollupClick = this._handleFormRollupClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  render(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointFormComponent = this._pointFormComponent;

    this._pointComponent = new pointView(this._point);
    this._pointFormComponent = new pointFormView(this._point);

    this._pointComponent.setRollupClickHandler(this._handleRollupClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointFormComponent.setRollupClickHandler(this._handleFormRollupClick);
    this._pointFormComponent.setSaveClickHandler(this._handleSaveClick);
    this._pointFormComponent.setDeleteClickHandler(this._handleDeleteClick);

    if(prevPointComponent === null || prevPointFormComponent === null) {
      render(this._eventListContainer, this._pointComponent, RenderPosition.BEFOREEND);
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

  resetView() {
    if(!(this._mode === Mode.DEFAULT)) {
      this._replaceFormToDefault();
    }
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointFormComponent);
  }

  _replaceDefaultToForm() {
    replace(this._pointFormComponent, this._pointComponent);
    document.addEventListener('keydown', this._documentKeydownHandler);
    this._changeMode();
    this._mode = Mode.FORM;
  }

  _replaceFormToDefault() {
    this._pointFormComponent.reset(this._point);
    replace(this._pointComponent, this._pointFormComponent);
    document.removeEventListener('keydown', this._documentKeydownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleRollupClick() {
    this._replaceDefaultToForm();
  }

  _documentKeydownHandler(event) {
    if(isEscEvent(event)) {
      event.preventDefault();
      this._pointFormComponent.reset(this._point);
      this._replaceFormToDefault();
      document.removeEventListener('keydown', this._documentKeydownHandler);
    }
  }

  _handleFormRollupClick() {
    this._pointFormComponent.reset(this._point);
    this._replaceFormToDefault();
  }

  _handleSaveClick(update) {
    this._updateView(
      UserAction.UPDATE_POINT,
      UpdateType.SAVE,
      update,
    );
    document.removeEventListener('keydown', this._documentKeydownHandler);
    //this._replaceFormToDefault();
  }

  _handleDeleteClick(update) {
    this._updateView(
      UserAction.DELETE_POINT,
      UpdateType.SORT,
      update,
    );
    document.removeEventListener('keydown', this._documentKeydownHandler);
  }

  _handleFavoriteClick() {
    this._updateView(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }
}
