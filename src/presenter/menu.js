import { MenuItem } from '../const';
import { remove, render, RenderPosition, replace } from '../utils/render';
import MenuView from '../view/menu.js';
import NewPointBtnView from '../view/new-point.js';
//import NewPointPresenter from './new-point.js';

export default class Menu {
  constructor(bodyContainer, tripModel, filterModel, sortModel) {
    this._bodyContainer = bodyContainer;
    this._menuContainer = this._bodyContainer.querySelector('.trip-controls__navigation');
    this._newPointBtnContainer = this._bodyContainer.querySelector('.trip-main');

    this._tripModel = tripModel;
    this._filterModel = filterModel;
    this._sortModel = sortModel;
    this._menuComponent = null;
    this._newPointBtnComponent = null;
    this._eventsContainer = this._bodyContainer.querySelector('.trip-events');

    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);
    this._handleNewPointBtnClick = this._handleNewPointBtnClick.bind(this);
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

    this._newPointBtnComponent = new NewPointBtnView();
    this._newPointBtnComponent.setNewPointBtnClickHandler(this._handleNewPointBtnClick);

    if(prevNewPointBtnComponent === null) {
      render(this._newPointBtnContainer, this._newPointBtnComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._newPointBtnComponent, prevNewPointBtnComponent);
    remove(prevNewPointBtnComponent);
  }

  _handleSiteMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.ADD_NEW_POINT:
        // Hide Stats
        // Show Table
        // Open blank form
        // Disable New Event button
        break;
      case MenuItem.TABLE:
        // Show Table
        // Hide Stats
        break;
      case MenuItem.STATS:
        // Hide Table
        // Show Stats
        break;
    }
  }

  _handleNewPointBtnClick(event) {
    event.target.disabled = !event.target.disabled;
    this._trip.createPoint();
  }
}
