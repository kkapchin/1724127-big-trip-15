import dayjs from 'dayjs';
import { FilterType } from '../const.js';

export const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateFrom) >= dayjs()),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateTo) < dayjs()),
};
