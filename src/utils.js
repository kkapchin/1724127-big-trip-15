import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

export const renderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, position) => {
  switch (position) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const calculateDuration = (start, end) => {
  const difference = dayjs(end).diff(dayjs(start), 'minutes');
  const dayjsDuration = dayjs.duration(difference, 'm');
  const duration = {
    days: `${dayjsDuration.format('DD')}D`,
    hours: `${dayjsDuration.format('HH')}H`,
    minutes: `${dayjsDuration.format('mm')}M`,
  };
  if(parseInt(duration.days, 10)) {
    duration.full = `${duration.days} ${duration.hours} ${duration.minutes}`;
  } else if(!parseInt(duration.days, 10) && parseInt(duration.hours, 10)) {
    duration.full = `${duration.hours} ${duration.minutes}`;
  } else {
    duration.full = duration.minutes;
  }
  return duration.full;
};

export const transformData = (data) => data.map((element) => (
  {
    price: element.basePrice,
    dispatchDate: dayjs(element.dateFrom).format('DD/MM/YY'),
    dispatchTime: dayjs(element.dateFrom).format('HH:mm'),
    arrivalDate: dayjs(element.dateTo).format('DD/MM/YY'),
    arrivalTime: dayjs(element.dateTo).format('HH:mm'),
    eventDay: dayjs(element.dateTo).format('MMM DD'),
    dateClass: dayjs(element.dateFrom).format('YYYY-MM-DD'),
    dispatchTimeClass: dayjs(element.dateFrom).format('YYYY-MM-DDTHH:mm'),
    arrivalTimeClass: dayjs(element.dateTo).format('YYYY-MM-DDTHH:mm'),
    duration: calculateDuration(element.dateFrom, element.dateTo),
    type: element.type,
    offers: element.offers,
    destination: element.destination,
  }
));

export const getRouteInfo = (points) => {
  const [...cities] = new Set(points.map((element) => element.destination.name));
  return {
    cities: cities.join('&nbsp;&mdash;&nbsp;'),
    period: `${points[0].eventDay}&nbsp;&mdash;&nbsp;${points[points.length - 1].eventDay}`,
  };
};
