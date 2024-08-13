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

export function transformCoordinates(coordinate: Coordinate, polygon: Polygon): number[][] {
  const { topLeft, topRight, bottomLeft, bottomRight } = polygon;
  const { lat, lng } = coordinate;
  console.log("original polygon is: ", polygon);

  // Extract the latitudes and longitudes
  const lats = [Math.round(topLeft.lat), Math.round(topRight.lat), Math.round(bottomLeft.lat), Math.round(bottomRight.lat), Math.round(lat)];
  const lngs = [Math.round(topLeft.lng), Math.round(topRight.lng), Math.round(bottomLeft.lng), Math.round(bottomRight.lng), Math.round(lng)];

  // Find the most negative latitude and longitude
  const mostNegativeLat = Math.min(0, ...lats);
  const mostNegativeLng = Math.min(0, ...lngs);

  const traslatedPolygon = [
    [
      Math.round(topLeft.lng) - mostNegativeLng,
      Math.round(topLeft.lat) - mostNegativeLat,
    ],
    [
      Math.round(topRight.lng) - mostNegativeLng,
      Math.round(topRight.lat) - mostNegativeLat,
    ],
    [
      Math.round(bottomLeft.lat) - mostNegativeLat,
      Math.round(bottomLeft.lng) - mostNegativeLng,
    ],
    [
      Math.round(bottomRight.lat) - mostNegativeLat,
      Math.round(bottomRight.lng) - mostNegativeLng,
    ],
  ]

  // Transform the coordinates
  console.log("Transformed polygon is: ", traslatedPolygon)
  return traslatedPolygon;
}

export function transformSingleCoordinate(coordinate: Coordinate, polygon: Polygon): [number,number] {
  const { lat, lng } = coordinate;
  const { topLeft, topRight, bottomLeft, bottomRight } = polygon;
  console.log('Original coordinate: ', coordinate);

  // Extract the latitudes and longitudes
  const lats = [Math.round(topLeft.lat), Math.round(topRight.lat), Math.round(bottomLeft.lat), Math.round(bottomRight.lat), Math.round(lat)];
  const lngs = [Math.round(topLeft.lng), Math.round(topRight.lng), Math.round(bottomLeft.lng), Math.round(bottomRight.lng), Math.round(lng)];
  
  // Find the most negative latitude and longitude
  const mostNegativeLat = Math.min(0, ...lats);
  const mostNegativeLng = Math.min(0, ...lngs);

  const traslatedCoordinate = [Math.round(lat) - mostNegativeLat, Math.round(lng) - mostNegativeLng]
  console.log('Transformed coordinate: ', traslatedCoordinate);

  // Transform the coordinate
  return traslatedCoordinate as [number, number];
}
