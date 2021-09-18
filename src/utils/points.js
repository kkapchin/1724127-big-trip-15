import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

const THREE = 3;

export const calculateDuration = (start, end) => {
  const difference = dayjs(end).diff(dayjs(start), 'minutes');
  const dayjsDuration = dayjs.duration(difference, 'm');
  const duration = {
    days: `${dayjsDuration.format('DD')}D`,
    hours: `${dayjsDuration.format('HH')}H`,
    minutes: `${dayjsDuration.format('mm')}M`,
    total: difference,
  };
  if(parseInt(duration.days, 10)) {
    duration.view = `${duration.days} ${duration.hours} ${duration.minutes}`;
  } else if(!parseInt(duration.days, 10) && parseInt(duration.hours, 10)) {
    duration.view  = `${duration.hours} ${duration.minutes}`;
  } else {
    duration.view  = duration.minutes;
  }
  return {
    view: duration.view,
    total: duration.total,
  } ;
};

export const transformToPoints = (points) => points.map((point) => (
  {
    price: point.basePrice,
    dispatchDate: dayjs(point.dateFrom).format('DD/MM/YY HH:mm'),
    dispatchTime: dayjs(point.dateFrom).format('HH:mm'),
    arrivalDate: dayjs(point.dateTo).format('DD/MM/YY HH:mm'),
    arrivalTime: dayjs(point.dateTo).format('HH:mm'),
    eventDay: dayjs(point.dateTo).format('MMM DD'),
    dateClass: dayjs(point.dateFrom).format('YYYY-MM-DD'),
    dispatchTimeClass: dayjs(point.dateFrom).format('YYYY-MM-DDTHH:mm'),
    arrivalTimeClass: dayjs(point.dateTo).format('YYYY-MM-DDTHH:mm'),
    duration: calculateDuration(point.dateFrom, point.dateTo),
    type: point.type,
    offers: point.offers,
    destination: point.destination,
    /* city: point.destination.name,
    pictures: point.destination.pictures,
    description: point.destination.description, */
    isFavorite: point.isFavorite,
    id: point.id,
  }
));

export const getRouteInfo = (points) => {
  const FIRST_POINT = points[0];
  const LAST_POINT = points[points.length - 1];
  const [...cities] = new Set(points.map((element) => element.destination.name));
  /* return {
    cities: cities.join('&nbsp;&mdash;&nbsp;'),
    period: `${points[0].eventDay}&nbsp;&mdash;&nbsp;${points[points.length - 1].eventDay}`,
  }; */
  return {
    cities: cities.length > THREE ? `${FIRST_POINT.destination.name}&nbsp;&mdash;&#8228;&#8228;&#8228;&mdash;&nbsp;${LAST_POINT.destination.name}` : cities.join('&nbsp;&mdash;&nbsp;'),
    period: `${FIRST_POINT.eventDay}&nbsp;&mdash;&nbsp;${LAST_POINT.eventDay}`,
  };
};

export const isEmptyEventsList = (points) =>
  points.length === 0 || points === undefined;
