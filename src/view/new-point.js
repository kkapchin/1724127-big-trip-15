//import { ButtonState } from '../const.js';
import Abstract from './abstract.js';

const createNewPointBtn = (buttonState) => `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${buttonState}>New event</button>`;

export default class NewPointBtn extends Abstract{
  constructor() {
    super();
    //this._buttonState = ButtonState.ENABLED;

    this._newPointBtnClickHandler = this._newPointBtnClickHandler.bind(this);
  }

  getTemplate() {
    return createNewPointBtn(this._buttonState);
  }

  _newPointBtnClickHandler(event) {
    event.preventDefault();
    //this._buttonState = ButtonState.DISABLED;
    this._callback.newPointBtnClick(event);
  }

  setNewPointBtnClickHandler(callback) {
    this._callback.newPointBtnClick = callback;
    this.getElement().addEventListener('click', this._newPointBtnClickHandler);
  }
}
