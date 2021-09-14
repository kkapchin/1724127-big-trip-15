export const getRouteInfo = (points) => {
  const [...cities] = new Set(points.map((element) => element.destination.name));
  return {
    cities: cities.join('&nbsp;&mdash;&nbsp;'),
    period: `${points[0].eventDay}&nbsp;&mdash;&nbsp;${points[points.length - 1].eventDay}`,
  };
};
