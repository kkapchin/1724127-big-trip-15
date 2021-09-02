import dayjs from 'dayjs';

export const calculateDuration = (start, end) => {

  const duration = {
    days: 0,
    hours: 0,
    minutes: 0,
  };

  const difference = dayjs(end).diff(dayjs(start), 'minutes');

  const template = dayjs('1666-01-01');

  duration.days = template.minute(Math.floor(difference / 60 / 24)).format('mm');
  duration.hours = template.minute(Math.floor(difference / 60) - (duration.days * 24)).format('mm');
  duration.minutes = template.minute(difference - (duration.days * 1440 + duration.hours * 60)).format('mm');

  if(parseInt(duration.days, 10)) {
    duration.total = `${duration.days}D ${duration.hours}H ${duration.minutes}M`;
  } else if(!parseInt(duration.days, 10) && parseInt(duration.hours, 10)) {
    duration.hours = template.minute(Math.floor(difference / 60)).format('mm');
    duration.minutes = template.minute(difference - (duration.hours * 60)).format('mm');
    duration.total = `${duration.hours}H ${duration.minutes}M`;
  } else {
    duration.total = `${duration.minutes}M`;
  }
  return duration.total;
};
