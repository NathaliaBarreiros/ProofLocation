import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import './Map.css';

const BlueBox = ({ bounds }: any) => {
  const { topLeft, topRight, bottomLeft, bottomRight } = bounds;
  return (
    <div className="blue-box">
      <div className="corner top-left">{`Lat: ${topLeft.lat}, Lng: ${topLeft.lng}`}</div>
      <div className="corner top-right">{`Lat: ${topRight.lat}, Lng: ${topRight.lng}`}</div>
      <div className="corner bottom-left">{`Lat: ${bottomLeft.lat}, Lng: ${bottomLeft.lng}`}</div>
      <div className="corner bottom-right">{`Lat: ${bottomRight.lat}, Lng: ${bottomRight.lng}`}</div>
    </div>
  );
};

const Map = () => {
  const [bounds, setBounds] = useState({
    topLeft: { lat: 0, lng: 0 },
    topRight: { lat: 0, lng: 0 },
    bottomLeft: { lat: 0, lng: 0 },
    bottomRight: { lat: 0, lng: 0 }
  });

  const UpdateBounds = () => {
    const map = useMapEvents({
      moveend: () => {
        const bounds = map.getBounds();
        setBounds({
          topLeft: { lat: bounds.getNorthWest().lat, lng: bounds.getNorthWest().lng },
          topRight: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
          bottomLeft: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
          bottomRight: { lat: bounds.getSouthEast().lat, lng: bounds.getSouthEast().lng }
        });
      }
    });
    return null;
  };

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '650px', width: '1000px' }}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdateBounds />
      </MapContainer>
      <BlueBox bounds={bounds} />
    </div>
  );
};

export default Map;
