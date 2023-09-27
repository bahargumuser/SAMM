import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";



function Map() {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState([0, 0]);

  const center = [48.5866, 2.3522];
  const zoom = 13;

  const onClick = useCallback(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);

  const onMove = useCallback(() => {
    if (map) {
      const center = map.getCenter();
    if (center) {
      setPosition([center.lat, center.lng]);
    }
  }
  }, [map]);
  
  useEffect(() => {
    console.log(map);
    if (map) {
       
      map.on('move', onMove);
   
      return () => {
        map.off('move', onMove);

      };
    }
  }, [map, onMove]);

  const displayMap = useMemo(() => (
    <MapContainer center={center} zoom={zoom} ref={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
   
    </MapContainer>
  ), [center, zoom]);

  return (
    <div>
  
      <div className="sidebar">
     
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1000',
            border: '0.5vh solid #000',
            padding: '2.8vh',
            width: '50vh',
            height: '200px',
            backgroundColor: '#fff',
          }}
        >
           {map && position ? (
        <p>
          latitude: {position[0].toFixed(4)}, longitude: {position[1].toFixed(4)}{' '}
          <button onClick={onClick}>reset</button>
        </p>
      ) : null}
          <h2>Önceki Konumlar</h2>
        
          <ul>
            <li>Lat: 28.3852, Long: -81.5639</li>
            <li>Lat: 28.3852, Long: -81.5639</li>
          </ul>
          <p>
            <button>
              Noktayı Kaydet
            </button>
          </p>
          <p>
            <button>
              İndir
            </button>
          </p>
          <p>
            <button>
              Sil
            </button>
          </p>
        </div>
      </div>
      {displayMap}
    </div>
  );
}


export default Map;
