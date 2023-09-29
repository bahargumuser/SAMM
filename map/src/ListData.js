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

    <div style={{
      maxHeight: "60vh",
      overflow: "auto" 
    }}>

      <ul>
        {data.map((item, index) => (
          <li key={index}
            style={{
            borderStyle: "dotted",
            borderWidth: "2px",
            paddingInline: "4px",
            margin: "10px 0px 10px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           }}>

            <div>
            <p
            style={{
             whiteSpace: "nowrap"
              }}>
            Latitude: {item.lat.toFixed(2)},  <br />Longitude: {item.lng.toFixed(2)}, <br /> Date: {item.datetime} 
            </p>
            </div>

            <button onClick={() => handleDelete(item.id)}

            style={{
                backgroundColor: "#f5f5f5", 
                borderRadius: "10px", 
                cursor: "pointer",
                padding: "4px",
                marginLeft: "7px",
              }}
              
              >Sil</button>

            <button onClick={() => setClickPoint([item.lat, item.lng])}

            style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "10px", 
                cursor: "pointer",
                padding: "4px",
                marginLeft: "7px"
              }}

              >Noktaya Git</button>

          </li>
        ))}
      </ul>
    </div>
  );
}
export default ListData;