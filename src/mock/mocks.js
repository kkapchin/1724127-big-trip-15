import dayjs from 'dayjs';
import { SortBy, transformToPoints } from '../utils/points.js';
import { getRandomInteger } from '../utils/common.js';
import { nanoid } from 'nanoid';
import { City } from '../const.js';

const EVENTS = [
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

const generateRandomEvent = () => {
  const randomIndex = getRandomInteger(0, EVENTS.length - 1);

  return EVENTS[randomIndex];
};

const generateTime = () => {
  const duration = {
    days: getRandomInteger(0, 2),
    hours: getRandomInteger(0, 2),
    minutes: getRandomInteger(0, 59),
  };

  const dispatchDate =  dayjs('2021-09-19').add(duration.minutes, 'minutes').add(duration.hours, 'hours').add(duration.days, 'days');
  const arrivalDate = dispatchDate.add(duration.minutes, 'minutes').add(duration.hours, 'hours').add(duration.days, 'days');
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
    dispatch: dispatchDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    arrival: arrivalDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
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

const generateDestination = (all = false) => {
  const cities = [
    {
      description: generateDescription(),
      name: City.PERSEPOLIS,
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
      name: City.AKSUM,
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
      name: City.ALEXANDRIA,
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
      name: City.CARTHAGE,
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
      name: City.ROME,
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

  if(all) {
    return cities;
  }

  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

export const generateDestinations = (currentDestination = null) =>
  generateDestination(true)
    .filter((destination) => !(destination.name === currentDestination));
  //.sort((a, b) => a.name > b.name);

const generateMock = () => {
  const event = generateRandomEvent();
  const time = generateTime();
  const destination = generateDestination();
  const destinations = generateDestinations(destination.name);

  return {
    basePrice: event.price,
    dateFrom: time.dispatch,
    dateTo: time.arrival,
    destination: destination,
    id: nanoid(),
    isFavorite: false,
    offers: event.offers,
    type: event.type,
    destinations: destinations,
  };
};

/* export const getPoints = (quantity) => {
  const mocks = new Array(quantity)
    .fill()
    .map(() => generateMock())
    .sort(SortBy.DEFAULT);
  return transformToPoints(mocks);
}; */

export const getPoints = (quantity) =>
  transformToPoints(
    new Array(quantity)
      .fill()
      .map(() => generateMock())
      .sort(SortBy.DEFAULT),
  );

export const getDestinationByCity = (city) => {
  const mock = generateMock();
  mock.destination.name = city;
  return transformToPoints(mock);
};

export const updateOffers = (eventType) => {
  let offers = undefined;
  EVENTS.forEach((event) => {
    if(event.type === eventType) {
      offers = event.offers;
    }
  });
  return offers;
};

/* export const generateDestinations = (currentDestination = null) =>
  generateDestination(true)
    .filter((destination) => !(destination.name === currentDestination))
    .sort((a, b) => a.name > b.name);
  //.forEach((destination) => [...destination.cities] = new Set(destinations.map((destination) => destination.name))
 */
