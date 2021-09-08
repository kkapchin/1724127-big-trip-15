import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

export const calcDurDayjs = (start, end) => {
  const difference = dayjs(end).diff(dayjs(start), 'minutes');
  const dayjsDuration = dayjs.duration(difference, 'm');
  const duration = {
    days: `${dayjsDuration.format('DD')}D`,
    hours: `${dayjsDuration.format('HH')}H`,
    minutes: `${dayjsDuration.format('mm')}M`,
  };
  if(parseInt(duration.days, 10)) {
    duration.total = `${duration.days} ${duration.hours} ${duration.minutes}`;
  } else if(!parseInt(duration.days, 10) && parseInt(duration.hours, 10)) {
    duration.total = `${duration.hours} ${duration.minutes}`;
  } else {
    duration.total = duration.minutes;
  }
  //return dayjs.duration(difference, 'm').format(`DD${'D'} HH${'H'} mm${'M'}`);
  //`${dayjsDuration.format('DD')}D ${dayjsDuration.format('HH')}H ${dayjsDuration.format('mm')}M`;
  return duration.total;
};
