import React from 'react';
import axios from 'axios';

function ListData({ data, setClickPoint }) {
  const handleDelete = async (itemId) => {
    try {
      const response = await axios.post("http://localhost:3001/sil", { id: itemId });
      console.log("Silindi", response.data);
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Latitude: {item.lat.toFixed(2)}, Longitude: {item.lng.toFixed(2)}, Date: {item.datetime}
            <button onClick={() => handleDelete(item.id) } style={{
                backgroundColor: "#f5f5f5", 
                padding: "5px 10px", 
                borderRadius: "10px", 
                marginRight: "10px", 
                marginBottom: "10px", 
                cursor: "pointer",
              }}>Sil</button>
              
            <button onClick={() => setClickPoint([item.lat, item.lng])} style={{
                backgroundColor: "#f5f5f5", 
                padding: "5px 10px", 
                borderRadius: "10px", 
                marginRight: "10px", 
                marginBottom: "10px", 
                cursor: "pointer",
              }}> Noktaya Git</button>

          </li>
        ))}
      </ul>
    </div>
  );
}
export default ListData;