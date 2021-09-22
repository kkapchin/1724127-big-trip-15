import dayjs from 'dayjs';
//import { calculateDuration } from './utils/points';

export const SortType = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFERS: 'Offers',
};

export const Checkbox = {
  TRUE: 'checked',
  FALSE: '',
};

export const City = {
  PERSEPOLIS: 'Persepolis',
  AKSUM: 'Aksum',
  ALEXANDRIA: 'Alexandria',
  CARTHAGE: 'Carthage',
  ROME: 'Rome',
};

export const Order = {
  FIRST: 0,
  SECOND: 1,
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  NONE: 'NONE',
  PATCH: 'PATCH',
  SAVE: 'SAVE',
  FILTER: 'FILTER',
  NEW_POINT: 'NEW_POINT',
  SORT: 'SORT',
  FULL: 'FULL',
  INIT: 'INIT',
};

export const FilterType = {
  ALL: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};

export const FilterMessage = {
  ALL: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PAST: 'There are no past events now',
};

export const Disabled = {
  TRUE: 'disabled',
  FALSE: '',
};

export const Autocomplete = {
  ON: 'autocomplete="on"',
  OFF: 'autocomplete="off"',
};

export const BLANK_POINT = {
  price: '',
  dateFrom: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  dateTo: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  isFavorite: false,
  dispatchDate: dayjs().format('DD/MM/YY HH:mm'),
  dispatchTime: dayjs().format('HH:mm'),
  arrivalDate: dayjs().format('DD/MM/YY HH:mm'),
  arrivalTime: dayjs().format('HH:mm'),
  eventDay: dayjs().format('MMM DD'),
  dateClass: dayjs().format('YYYY-MM-DD'),
  dispatchTimeClass: dayjs().format('YYYY-MM-DDTHH:mm'),
  arrivalTimeClass: dayjs().format('YYYY-MM-DDTHH:mm'),
  duration: '',
  type: 'flight',
  offers: [],
  destination: [],
  isBlank: true,
};

export const MenuState = {
  DEFAULT: 'DEFAULT',
  NEW_EVENT: 'NEW_EVENT',
  TABLE: 'TABLE',
  STATS: 'STATS',
};
