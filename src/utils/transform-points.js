import dayjs from 'dayjs';
import { calculateDuration } from './calculate-duration.js';

export const transformPoints = (points) => points.map((point) => (
  {
    price: point.basePrice,
    dispatchDate: dayjs(point.dateFrom).format('DD/MM/YY'),
    dispatchTime: dayjs(point.dateFrom).format('HH:mm'),
    arrivalDate: dayjs(point.dateTo).format('DD/MM/YY'),
    arrivalTime: dayjs(point.dateTo).format('HH:mm'),
    eventDay: dayjs(point.dateTo).format('MMM DD'),
    dateClass: dayjs(point.dateFrom).format('YYYY-MM-DD'),
    dispatchTimeClass: dayjs(point.dateFrom).format('YYYY-MM-DDTHH:mm'),
    arrivalTimeClass: dayjs(point.dateTo).format('YYYY-MM-DDTHH:mm'),
    duration: calculateDuration(point.dateFrom, point.dateTo),
    type: point.type,
    offers: point.offers,
    destination: point.destination,
  }
));
