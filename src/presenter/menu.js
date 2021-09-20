import { FilterType, MenuItem, SortType, UpdateType } from '../const';
import { render, RenderPosition } from '../utils/render';
import AppMenuView from '../view/menu.js';
import NewPointBtnView from '../view/new-point';

export default class Menu {
  constructor(bodyContainer, tripModel, filterModel) {
    this._bodyContainer = bodyContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;
    this._menuComponent = null;
    this._newPointBtnComponent = null;

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

  createPoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.FILTER, FilterType.ALL);
    this._newPointPresenter.render();
  }

  _handleSiteMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.ADD_NEW_POINT:
        // Скрыть статистику
        // Показать доску
        // Показать форму добавления новой задачи
        // Убрать выделение с ADD NEW TASK после сохранения
        break;
      case MenuItem.TABLE:
        // Показать доску
        // Скрыть статистику
        break;
      case MenuItem.STATS:
        // Скрыть доску
        // Показать статистику
        break;
    }
  }

  _handleNewPointBtnClick(event) {
    event.target.disabled = !event.target.disabled;
    /* this._pointPresenters.forEach((presenter) => presenter.resetView());
    this._newPointPresenter.render(); */
    //this._tripModel.
  }
}
