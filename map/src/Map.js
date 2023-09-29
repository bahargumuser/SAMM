import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import axios from "axios";
import ListData from "./ListData";

function Map() {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [position, setPosition] = useState([0, 0]);
  const [savedPoints, setSavedPoints] = useState([]);
  const [clickPoint, setClickPoint] = useState([48.5866, 2.3522]);


  const crosshairIcon = new L.Icon({
    iconUrl: './maps-and-flags (1).png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });


  const center = [48.8566, 2.3522]; //Paris
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


  const handleSaveClick = async () => {
    if (position && position.length === 2) {
      const [lat, lng] = position;
      const datetime = new Date().toISOString();
      try {
        const response = await axios.post(saveUrl, { lat, lng, datetime });
        console.log("Nokta kaydedildi:", response.data);
        setSavedPoints([...savedPoints, response.data]);
        console.log(savedPoints);
      } catch (error) {
        console.error("Kaydetme hatası:", error);
      }
    }
  };


  const saveUrl = "http://localhost:3001/kaydet";
  const downloadUrl = "http://localhost:3001/indir";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/veriler");
        if (response.data) {
          setSavedPoints(response.data);
        } else {
          console.error("API yanıtı boş veya beklenen veri yapıda değil.");
        }
      } catch (error) {
        console.error("Veri alınırken bir hata oluştu:", error);
      }
    };
    fetchData();
  }, [savedPoints]);


  useEffect(() => {
    console.log(map);
    if (map) {
      map.on("move", onMove);
      return () => {
        map.off("move", onMove);
      };
    }
  }, [map, onMove]);
  const handleDownloadClick = () => {
    window.location.href = downloadUrl;
  };


  const displayMap = useMemo(
    () => (
      <MapContainer center={clickPoint} zoom={zoom} ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {map && <Marker position={clickPoint} icon={crosshairIcon} clickable={false} />}
      </MapContainer>
    ),
    [center, zoom, clickPoint]
  );


  useEffect(() => {
    if (mapRef.current) {
      setMap(mapRef.current.leafletElement);
    }
  }, []);


  useEffect(() => {
    if (map) {
      map.setView(clickPoint, zoom);
    }
  }, [map, clickPoint, zoom]);


  return (
    <div>
      <div className="sidebar">
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "1000",
            border: "1.5px solid #000",
            padding: "4px",
            width: "60vh",
            height: "auto",
            backgroundColor: "#fff",
            fontFamily:"monospace",
            fontSize:"2vh",
           
          }}
        >
         
        <h2
        style={{
        textAlign: "center"
        }}>
          Saved Points</h2>

            {map && position ? (
            <p
            style={{
            textAlign: "center",
            }}>


              latitude: {position[0].toFixed(4)}, longitude:{" "}
              {position[1].toFixed(4)} <button onClick={onClick} 

              style={{
                backgroundColor: "#f5f5f5", 
                padding: "5px 8px", 
                borderRadius: "10px", 
                marginRight: "5px",  
                marginBottom: "1px", 
                cursor: "pointer",
                marginLeft: "6px"
              }}
              >reset</button>
            </p>
          ) : null}

           <div style={{
            display: "flex",
            padding: "10px"
           }}
           >
          <p>
            
            <button onClick={handleSaveClick} 
            style={{
                backgroundColor: "#f5f5f5", 
                padding: "5px 8px", 
                borderRadius: "10px", 
                marginRight: "5px",  
                marginBottom: "1px", 
                cursor: "pointer",
              }}>
                Noktayı Kaydet</button>
          </p> 

          <p>
            <button onClick={handleDownloadClick}  style={{
                backgroundColor: "#f5f5f5", 
                padding: "5px 8px", 
                borderRadius: "10px", 
                marginRight: "5px", 
                marginBottom: "1px", 
                cursor: "pointer",
              }}>İndir</button>
          </p>
        </div>

        <ListData data={savedPoints} setClickPoint={setClickPoint}/>

        </div>
      </div>

      {displayMap}
      
    </div>
  );
          }
export default Map;