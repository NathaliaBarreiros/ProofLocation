// Define la estructura de una coordenada con latitud y longitud
interface Coordinate {
  lat: number;
  lng: number;
}

// Define la estructura de un polígono con cuatro esquinas específicas
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

// Constante que representa el máximo entero seguro en JavaScript
// Usada para limitar los valores discretizados
const MAX_SAFE_INTEGER = Math.pow(2, 52) - 1;

// Función para discretizar un valor numérico
// Redondea al entero superior y limita al máximo entero seguro
const discretizar = (valor: number): number =>
    Math.min(Math.ceil(valor), MAX_SAFE_INTEGER);

// Función para encontrar los valores mínimos de latitud y longitud
// en un conjunto de coordenadas
const encontrarMinimos = (coordenadas: Coordinate[]): [number, number] => {
    const [minLat, minLng] = coordenadas.reduce(
        ([minLat, minLng], { lat, lng }) => [
            Math.min(minLat, lat),
            Math.min(minLng, lng)
        ],
        [Infinity, Infinity]
    );
    return [minLat, minLng];
};

// Función para calcular el desplazamiento necesario
// para hacer un valor positivo
const calcularDesplazamiento = (minimo: number): number =>
    minimo < 0 ? Math.abs(minimo) : 0;

// Función para transformar una coordenada
// aplicando desplazamiento y discretización
const transformarCoordenada = (
    { lat, lng }: Coordinate,
    desplazamientoLat: number,
    desplazamientoLng: number
): [number, number] => [
    discretizar(lng + desplazamientoLng),
    discretizar(lat + desplazamientoLat)
];

// Función principal exportada para transformar el polígono y la coordenada adicional
export function transformPolygonPoint(
    poligono: Polygon,
    coordenada: Coordinate
): { poligonoTransformado: number[][], coordenadaTransformada: number[] } {
    // Extrae las coordenadas del polígono en un array
    const coordenadasPoligono = [
        poligono.topLeft,
        poligono.topRight,
        poligono.bottomLeft,
        poligono.bottomRight
    ];
    
    // Combina las coordenadas del polígono y la coordenada adicional
    const todasLasCoordenadas = [...coordenadasPoligono, coordenada];

    // Encuentra los valores mínimos de latitud y longitud
    const [minLat, minLng] = encontrarMinimos(todasLasCoordenadas);

    // Calcula los desplazamientos necesarios para hacer todos los valores positivos
    const desplazamientoLat = calcularDesplazamiento(minLat);
    const desplazamientoLng = calcularDesplazamiento(minLng);

    // Transforma las coordenadas del polígono
    const poligonoTransformado = coordenadasPoligono.map(coord =>
        transformarCoordenada(coord, desplazamientoLat, desplazamientoLng)
    );

    // Transforma la coordenada adicional
    const coordenadaTransformada = transformarCoordenada(
        coordenada,
        desplazamientoLat,
        desplazamientoLng
    );

    // Retorna el resultado de la transformación
    return { poligonoTransformado, coordenadaTransformada };
}