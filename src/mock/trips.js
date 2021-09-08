import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { calculateDuration } from '../utils/calculate-duration';

dayjs.extend(relativeTime);

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateRandomEvent = () => {
  const events = [
    {
      type: 'taxi',
      price: getRandomInteger(20, 100),
      offers: [
        {title: 'Order Uber', price: getRandomInteger(15, 30)},
      ],
    },
    {type: 'bus', price: getRandomInteger(5, 15)},
    {type: 'train', price: getRandomInteger(100, 150)},
    {type: 'ship', price: getRandomInteger(100, 150)},
    {
      type: 'drive',
      price: getRandomInteger(50, 200),
      offers: [
        {title: 'Rent a car', price: getRandomInteger(200, 300)},
      ],
    },
    {
      type: 'check-in',
      price: getRandomInteger(600, 1500),
      offers: [
        {title: 'Add breakfast', price: getRandomInteger(40, 60)},
      ],
    },
    {
      type: 'sightseeing',
      price: getRandomInteger(50, 100),
      offers: [
        {title: 'Book tickets', price: getRandomInteger(35, 50)},
        {title: 'Lunch in city', price: getRandomInteger(25, 35)},
      ],
    },
    {type: 'restaurant', price: getRandomInteger(50, 200)},
    {
      type: 'flight',
      price: getRandomInteger(160, 500),
      offers: [
        {title: 'Add luggage', price: getRandomInteger(30, 50)},
        {title: 'Switch to comfort', price: getRandomInteger(80, 100)},
        {title: 'Add meal', price: getRandomInteger(10, 20)},
        {title: 'Choose seats', price: getRandomInteger(5, 10)},
        {title: 'Travel by train', price: getRandomInteger(40, 50)},
      ],
    },
  ];

  const randomIndex = getRandomInteger(0, events.length - 1);
  return events[randomIndex];
};

const generateTime = () => {
  const duration = {
    days: getRandomInteger(0, 2),
    hours: getRandomInteger(0, 2),
    minutes: getRandomInteger(0, 59),
  };

  const dispatchDate =  dayjs().add(duration.minutes, 'minutes').add(duration.hours, 'hours').add(duration.days, 'days');
  const arrivalDate = dispatchDate.add(duration.minutes, 'minutes').add(duration.hours, 'hours').add(duration.days, 'days');
  /* const dispatchDay = dispatchDate.format('DD/MM/YY');
  const eventDay = dispatchDate.format('MMM DD');
  const dispatchTime = dispatchDate.format('HH:mm');
  const arrivalDay = arrivalDate.format('DD/MM/YY');
  const arrivalTime = arrivalDate.format('HH:mm'); */
  const difference = arrivalDate.diff(dispatchDate, 'minutes');
  const setDurationFormat = () => {
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
  };
  setDurationFormat();
  return {
    /* dispatchDate: dispatchDay,
    dispatchTime: dispatchTime,
    arrivalDate: arrivalDay,
    arrivalTime: arrivalTime,
    eventDay: eventDay,
    */
    dispatch: dispatchDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    arrival: arrivalDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    //duration: duration.total,
  };
};

const generateDescription = () => {
  const quantity = getRandomInteger(1, 5);
  const DESCRIPTIONS = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Cras aliquet varius magna, non porta ligula feugiat eget. ',
    'Fusce tristique felis at fermentum pharetra. ',
    'Aliquam id orci ut lectus varius viverra. ',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
    'Sed sed nisi sed augue convallis suscipit in sed felis. ',
    'Aliquam erat volutpat. ',
    'Nunc fermentum tortor ac porta dapibus. ',
    'In rutrum ac purus sit amet tempus. ',
  ];
  return new Array(quantity).fill().map(() => DESCRIPTIONS[getRandomInteger(0, 10)]).join('');
};

const generateDestination = () => {
  const cities = [
    {
      description: generateDescription(),
      name: 'Persepolis',
      pictures: [
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'The Apadana',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'The Apadana',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'The Apadana',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'The Apadana',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'The Apadana',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'The Apadana',
        },
      ],
    },
    {
      description: generateDescription(),
      name: 'Aksum',
      pictures: [
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Obelisk of Axum',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Obelisk of Axum',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Obelisk of Axum',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Obelisk of Axum',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Obelisk of Axum',
        },
      ],
    },
    {
      description: generateDescription(),
      name: 'Alexandria',
      pictures: [
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Alexandria parliament building',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Alexandria parliament building',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Alexandria parliament building',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Alexandria parliament building',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Alexandria parliament building',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Alexandria parliament building',
        },
      ],
    },
    {
      description: generateDescription(),
      name: 'Carthage',
      pictures: [
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Carthago delenda est',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Carthago delenda est',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Carthago delenda est',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Carthago delenda est',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Carthago delenda est',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'Carthago delenda est',
        },
      ],
    },
    {
      description: generateDescription(),
      name: 'Rome',
      pictures: [
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'SPQR',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'SPQR',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'SPQR',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'SPQR',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'SPQR',
        },
        {
          src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
          description: 'SPQR',
        },
      ],
    },
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const generateMock = () => {
  const event = generateRandomEvent();
  const time = generateTime();
  const destination = generateDestination();
  return {
    basePrice: event.price,
    dateFrom: time.dispatch,
    dateTo: time.arrival,
    destination: destination,
    id: '0',
    isFavorite: false,
    offers: event.offers,
    type: event.type,
  };
};

export const getPoints = (quantity) => {
  const mocks = new Array(quantity).fill().map(() => generateMock());
  mocks.sort((a, b) => a.dateFrom > b.dateFrom);
  return mocks.map((element) => (
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
};
