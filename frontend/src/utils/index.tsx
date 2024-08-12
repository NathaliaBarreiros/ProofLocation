interface Coordinate {
  lat: number;
  lng: number;
}

interface Polygon {
  topLeft: Coordinate;
  topRight: Coordinate;
  bottomLeft: Coordinate;
  bottomRight: Coordinate;
}

export function transformCoordinates(polygon: Polygon): number[][] {
  const { topLeft, topRight, bottomLeft, bottomRight } = polygon;

  // Extract the latitudes and longitudes
  const lats = [topLeft.lat, topRight.lat, bottomLeft.lat, bottomRight.lat];
  const lngs = [topLeft.lng, topRight.lng, bottomLeft.lng, bottomRight.lng];

  // Find the most negative latitude and longitude
  const mostNegativeLat = Math.min(0, ...lats);
  const mostNegativeLng = Math.min(0, ...lngs);

  // Transform the coordinates
  return [
    [
      Math.ceil(topLeft.lng - mostNegativeLng),
      Math.ceil(topLeft.lat - mostNegativeLat),
    ],
    [
      Math.ceil(topRight.lat - mostNegativeLat),
      Math.ceil(topRight.lng - mostNegativeLng),
    ],
    [
      Math.ceil(bottomLeft.lat - mostNegativeLat),
      Math.ceil(bottomLeft.lng - mostNegativeLng),
    ],
    [
      Math.ceil(bottomRight.lat - mostNegativeLat),
      Math.ceil(bottomRight.lng - mostNegativeLng),
    ],
  ];
}

export function transformSingleCoordinate(coordinate: Coordinate, polygon: Polygon): [number,number] {
  const { lat, lng } = coordinate;
  const { topLeft, topRight, bottomLeft, bottomRight } = polygon;

  // Extract the latitudes and longitudes
  const lats = [topLeft.lat, topRight.lat, bottomLeft.lat, bottomRight.lat];
  const lngs = [topLeft.lng, topRight.lng, bottomLeft.lng, bottomRight.lng];
  
  // Find the most negative latitude and longitude
  const mostNegativeLat = Math.min(0, ...lats);
  const mostNegativeLng = Math.min(0, ...lngs);

  // Transform the coordinate
  return [Math.ceil(lat - mostNegativeLat), Math.ceil(lng - mostNegativeLng)];
}
