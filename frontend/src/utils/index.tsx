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

export function transformCoordinates(polygon: Polygon): Polygon {
  const { topLeft, topRight, bottomLeft, bottomRight } = polygon;

  // Extract the latitudes and longitudes
  const lats = [topLeft.lat, topRight.lat, bottomLeft.lat, bottomRight.lat];
  const lngs = [topLeft.lng, topRight.lng, bottomLeft.lng, bottomRight.lng];

  // Find the most negative latitude and longitude
  const mostNegativeLat = Math.min(0,...lats);
  const mostNegativeLng = Math.min(0,...lngs);

  // Transform the coordinates
  return {
    topLeft: {
      lng: Math.ceil(topLeft.lng - mostNegativeLng),
      lat: Math.ceil(topLeft.lat - mostNegativeLat),
    },
    topRight: {
      lat: Math.ceil(topRight.lat - mostNegativeLat),
      lng: Math.ceil(topRight.lng - mostNegativeLng),
    },
    bottomLeft: {
      lat: Math.ceil(bottomLeft.lat - mostNegativeLat),
      lng: Math.ceil(bottomLeft.lng - mostNegativeLng),
    },
    bottomRight: {
      lat: Math.ceil(bottomRight.lat - mostNegativeLat),
      lng: Math.ceil(bottomRight.lng - mostNegativeLng),
    },
  };
}

export function transformSingleCoordinate(coordinate: Coordinate): Coordinate {
  const { lat, lng } = coordinate

  // Find the most negative latitude and longitude
  const mostNegativeLat = Math.min(0, lat)
  const mostNegativeLng = Math.min(0, lng)

  // Transform the coordinate
  return {
    lat: Math.ceil(lat - mostNegativeLat),
    lng: Math.ceil(lng - mostNegativeLng),
  }
}
