import { nanoid } from 'nanoid';
import { UpdateType, UserAction } from '../const';
import { isEscEvent } from '../utils/keyboard-events';
import { remove, render, RenderPosition } from '../utils/render';
import pointFormView from '../view/point-form.js';

export default class NewPoint {
  constructor(eventListContainer, updateView, changeData) {
    this._eventListContainer = eventListContainer;
    this._updateView = updateView;
    this._changeData = changeData;

    this._pointFormComponent = null;

    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
    this._handleFormRollupClick = this._handleFormRollupClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleDeletePointClick = this._handleDeletePointClick.bind(this);
  }

  render() {
    if(!(this._pointFormComponent === null)) {
      return;
    }

    this._pointFormComponent = new pointFormView();

    this._pointFormComponent.setRollupClickHandler(this._handleFormRollupClick);
    this._pointFormComponent.setSaveClickHandler(this._handleSaveClick);
    this._pointFormComponent.setDeleteClickHandler(this._handleDeletePointClick);

    render(this._eventListContainer, this._pointFormComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._documentKeydownHandler);
  }

  destroy() {
    if(this._pointFormComponent === null) {
      return;
    }

    remove(this._pointFormComponent);
    this._pointFormComponent = null;

    document.removeEventListener('keydown', this._documentKeydownHandler);
  }

  _handleSaveClick(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.FULL,
      Object.assign({id: nanoid()}, point),
    );
    this.destroy();
  }

  _handleFormRollupClick() {
    this._updateView(UpdateType.FULL);
    this.destroy();
  }

  _handleDeletePointClick() {
    this.destroy();
  }

  _documentKeydownHandler(event) {
    if(isEscEvent(event)) {
      event.preventDefault();
      this.destroy();
      this._updateView(UpdateType.FULL);
    }
  }
}
