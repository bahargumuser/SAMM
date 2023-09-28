import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import ListData from './ListData'; 

function Map() {
  
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState([0, 0]);
  const [savedPoints, setSavedPoints] = useState([]);

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

  const saveUrl = '/kaydet';
  const downloadUrl = '/indir';
  
  useEffect(() => {
    console.log(map);
    if (map) {
       
      map.on('move', onMove);
   
      return () => {
        map.off('move', onMove);

      };
    }
  }, [map, onMove]);

  const handleSaveClick = async () => {
    if (position && position.length === 2) {
      const [lat, lng] = position;
      const datetime = new Date().toISOString();
      try {
        const response = await axios.post(saveUrl, { lat, lng, datetime });
        console.log('Nokta kaydedildi:', response.data);
        setSavedPoints([...savedPoints, response.data]);
      } catch (error) {
        console.error('Kaydetme hatası:', error);
      }
    }
  };

  const handleDownloadClick = () => {
    // JSON dosyasını indirme
    window.location.href = downloadUrl;
  };

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
          <ListData data={savedPoints} />
          <p>
            <button onClick={handleSaveClick}> {/* axios ile back end verisi buradan alınacak */}
              Noktayı Kaydet
            </button>
          </p>
          <p>
            <button onClick={handleDownloadClick}>
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
