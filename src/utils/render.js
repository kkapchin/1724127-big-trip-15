import { renderPosition } from './render-position.js';

export const render = (container, element, position) => {
  switch (position) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
