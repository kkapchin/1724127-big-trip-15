//import { ButtonState } from '../const.js';
import Abstract from './abstract.js';

const createNewEventBtn = (buttonState) => `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${buttonState}>New event</button>`;

export default class NewEventBtn extends Abstract{
  constructor() {
    super();
    //this._buttonState = ButtonState.ENABLED;

    this._newEventBtnClickHandler = this._newEventBtnClickHandler.bind(this);
  }

  getTemplate() {
    return createNewEventBtn(this._buttonState);
  }

  _newEventBtnClickHandler(event) {
    event.preventDefault();
    //this._buttonState = ButtonState.DISABLED;
    this._callback.newEventBtnClick(event);
  }

  setNewEventBtnClickHandler(callback) {
    this._callback.newEventBtnClick = callback;
    this.getElement().addEventListener('click', this._newEventBtnClickHandler);
  }
}
