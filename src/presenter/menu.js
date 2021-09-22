import { Disabled, MenuState, UpdateType } from '../const';
import { remove, render, RenderPosition, replace } from '../utils/render';
import MenuView from '../view/menu.js';
import NewPointBtnView from '../view/new-point.js';
//import NewPointPresenter from './new-point.js';

export default class Menu {
  constructor(bodyContainer, updateView) {
    this._updateView = updateView;
    this._bodyContainer = bodyContainer;
    this._menuContainer = this._bodyContainer.querySelector('.trip-controls__navigation');
    this._newPointBtnContainer = this._bodyContainer.querySelector('.trip-main');

    this._menuComponent = null;
    this._newPointBtnComponent = null;
    this._newPointBtnState = Disabled.TRUE;
    this._eventsContainer = this._bodyContainer.querySelector('.trip-events');

    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);
  }

  render() {
    this._renderMenu();
    this._renderNewPointBtn();
  }

  _renderMenu() {
    const prevMenuComponent = this._menuComponent;

    this._menuComponent = new MenuView();
    this._menuComponent.setMenuClickHandler(this._handleSiteMenuClick);

    if(prevMenuComponent === null) {
      render(this._menuContainer, this._menuComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._menuComponent, prevMenuComponent);
    remove(prevMenuComponent);
  }

  _renderNewPointBtn() {
    const prevNewPointBtnComponent = this._newPointBtnComponent;

    this._newPointBtnComponent = new NewPointBtnView(this._newPointBtnState);
    this._newPointBtnComponent.setNewPointBtnClickHandler(this._handleSiteMenuClick);

    if(prevNewPointBtnComponent === null) {
      render(this._newPointBtnContainer, this._newPointBtnComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._newPointBtnComponent, prevNewPointBtnComponent);
    remove(prevNewPointBtnComponent);
  }

  _handleSiteMenuClick(menuState) {
    switch (menuState) {
      case MenuState.DEFAULT:
        this._newPointBtnState = Disabled.FALSE;
        this._renderNewPointBtn();
        break;
      case MenuState.NEW_EVENT:
        // Hide Stats
        // Show Table
        this._updateView(UpdateType.NEW_POINT);
        this._newPointBtnState = Disabled.TRUE;
        this._renderNewPointBtn();
        break;
      case MenuState.TABLE:
        // Show Table
        // Hide Stats
        break;
      case MenuState.STATS:
        // Hide Table
        // Show Stats
        break;
    }
  }

  setButtonStateEnabled() {
    if(this._newPointBtnState === Disabled.TRUE) {
      this._handleSiteMenuClick(MenuState.DEFAULT);
    }
  }
}
