import React from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';


  function Map() {


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
})


    return (
        <MapContainer center={[48.5866, 2.3522]} zoom={13}>
            <TileLayer
            attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    markers.map(marker => (
                            <Marker position={marker.geocode} icon={customIcon}>
                                <Popup>
                                    <h2>You are here now</h2>
                                </Popup>
                            </Marker>
                    ))
                }
      </MapContainer>
    );
  }

export default Map;
