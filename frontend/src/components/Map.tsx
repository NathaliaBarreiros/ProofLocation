import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setBounds as setStoreBounds } from '../store'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import './Map.css';

const BlueBox = ({ bounds }: any) => {
  const { topLeft, topRight, bottomLeft, bottomRight } = bounds;
  
  const formatCoord = (coord: number) => coord.toFixed(6);

  return (
    <div className="blue-box">
      <div className="corner top-left">{`Lat: ${formatCoord(topLeft.lat)}, Lng: ${formatCoord(topLeft.lng)}`}</div>
      <div className="corner top-right">{`Lat: ${formatCoord(topRight.lat)}, Lng: ${formatCoord(topRight.lng)}`}</div>
      <div className="corner bottom-left">{`Lat: ${formatCoord(bottomLeft.lat)}, Lng: ${formatCoord(bottomLeft.lng)}`}</div>
      <div className="corner bottom-right">{`Lat: ${formatCoord(bottomRight.lat)}, Lng: ${formatCoord(bottomRight.lng)}`}</div>
    </div>
  );
};

const Map = () => {
  const dispatch = useDispatch();
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
        const newBounds = {
          topLeft: { lat: bounds.getNorthWest().lat, lng: bounds.getNorthWest().lng },
          topRight: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
          bottomLeft: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
          bottomRight: { lat: bounds.getSouthEast().lat, lng: bounds.getSouthEast().lng }
        }
        setBounds(newBounds);
        dispatch(setStoreBounds(newBounds))
      }
    });
    return null;
  };

  return (
    <div>
      <MapContainer
        center={[-2.9001, -79.0059]}
        zoom={13}
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
