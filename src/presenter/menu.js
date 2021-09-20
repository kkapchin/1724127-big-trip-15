import { FilterType, MenuItem, SortType, UpdateType } from '../const';
import { render, RenderPosition } from '../utils/render';
import AppMenuView from '../view/menu.js';
import NewPointBtnView from '../view/new-point.js';
import NewPointPresenter from './new-point.js';

export default class Menu {
  constructor(bodyContainer, tripModel, filterModel, sortModel) {
    this._bodyContainer = bodyContainer;
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
    this._menuContainer = this._bodyContainer.querySelector('.trip-controls__navigation');
    this._newPointBtnContainer = this._bodyContainer.querySelector('.trip-main');

    this._menuComponent = new AppMenuView();
    this._newPointBtnComponent = new NewPointBtnView();

    this._menuComponent.setMenuClickHandler(this._handleSiteMenuClick);
    this._newPointBtnComponent.setNewPointBtnClickHandler(this._handleNewPointBtnClick);
    render(this._menuContainer, this._menuComponent, RenderPosition.BEFOREEND);
    render(this._newPointBtnContainer, this._newPointBtnComponent, RenderPosition.BEFOREEND);
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
