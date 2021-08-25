import dayjs from 'dayjs';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateRandomEvent = () => {
  const events = [
    {type: 'Taxi', price: getRandomInteger(20, 100)},
    {type: 'Bus', price: getRandomInteger(5, 15)},
    {type: 'Train', price: getRandomInteger(100, 150)},
    {type: 'Ship', price: getRandomInteger(100, 150)},
    {type: 'Drive', price: getRandomInteger(50, 200)},
    {type: 'Flight', price: getRandomInteger(160, 500)},
    {type: 'Check-in', price: getRandomInteger(600, 1500)},
    {type: 'Sightseeing', price: getRandomInteger(50, 100)},
    {type: 'Restaurant', price: getRandomInteger(50, 200)},
  ];

  const randomIndex = getRandomInteger(0, events.length - 1);
  return events[randomIndex];
};

const generateTime = () => {
  const duration = {
    days: 0,
    hours: getRandomInteger(0, 2),
    minutes: getRandomInteger(0, 59),
  };

  const dispatchDate =  dayjs();
  const arriveDate = dispatchDate.add(duration.minutes, 'minutes').add(duration.hours, 'hours').add(duration.days, 'days');
  const dispatchDay = dispatchDate.format('DD/MM/YY');
  const dispatchTime = dispatchDate.format('HH:mm');

  const difference = arriveDate.diff(dispatchDate, 'minutes');
  const setDurationFormat = () => {
    const test = dayjs('1666-01-01');
    /* if(difference / 60 >= 24) {
      duration.days = Math.floor(difference / 60 / 24);
      duration.hours = Math.floor(difference / 60) - (duration.days * 24);
      duration.minutes = difference - (duration.days * 1440 + duration.hours * 60);
    } */
    console.log(test.format('DD/MM/YY HH:mm'));
  };

  console.log(dispatchDate.format('DD/MM/YY HH:mm'));
  console.log(arriveDate.format('DD/MM/YY HH:mm'));
  console.log(difference)
  setDurationFormat();
  //1700 mins = 1d 4h 20m
};

generateTime();

const generateDestination = () => {
  const cities = [
    'Persepolis',
    'Addis Ababa',
    'Alexandria',
    'Carthage',
    'Rome',
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

export const generatePoint = () => {
  const event = generateRandomEvent();
  return {
    type: event.type,
    destination: generateDestination(),
    options: {
      duration: '01H 10M',
      price: event.price,
      dispatch: {
        date: '18/03/19',
        time: '12:25',
      },
      arrival: {
        date: '18/03/19',
        time: '13:35',
      },
    },
  };
};
