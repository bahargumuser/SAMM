import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';


  function Map() {

    const center = [48.5866, 2.3522];
    const zoom = 13;


    const markers = [
        {
          geocode: [48.86, 2.3522],
          popUp: "Hello, I am pop up 1"
        },
        {
          geocode: [48.85, 2.3522],
          popUp: "Hello, I am pop up 2"
        },
        {
          geocode: [48.855, 2.34],
          popUp: "Hello, I am pop up 3"
        }
      ];

const customIcon = new Icon({
    iconUrl : "https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
    iconSize : [38, 38]
});

const [position, setPosition] = useState(center);

const onClick = useCallback(() => {
  setPosition(center);
}, [center]);

const map = useMemo(() => (
  [center, zoom]));

    return (
     <div>
        
      <MapContainer center={center} zoom={zoom} >
    <TileLayer
          attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
                { markers.map(marker => (
                          <Marker position={marker.geocode} icon={customIcon} key={marker.geocode.join(',')}>
                              <Popup>
                                  <h2>{marker.popUp}</h2>
                              </Popup>
                          </Marker>
                  ))}
      </MapContainer>
      <p>
        latitude: {position[0].toFixed(4)}, longitude: {position[1].toFixed(4)}{' '}
        <button onClick={onClick}>reset</button>
        <button onClick={onClick}>noktayı kaydet</button>
      </p>
     </div>
    )
  }

export default Map;
