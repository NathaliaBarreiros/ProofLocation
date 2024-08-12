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
  const mostNegativeLat = Math.min(...lats);
  const mostNegativeLng = Math.min(...lngs);

  // Transform the coordinates
  return {
    topLeft: {
      lat: topLeft.lat - mostNegativeLat,
      lng: topLeft.lng - mostNegativeLng,
    },
    topRight: {
      lat: topRight.lat - mostNegativeLat,
      lng: topRight.lng - mostNegativeLng,
    },
    bottomLeft: {
      lat: bottomLeft.lat - mostNegativeLat,
      lng: bottomLeft.lng - mostNegativeLng,
    },
    bottomRight: {
      lat: bottomRight.lat - mostNegativeLat,
      lng: bottomRight.lng - mostNegativeLng,
    },
  };
}