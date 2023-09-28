import React from 'react';

function ListData({ data }) {
  return (
    <div>
      <h2>Saved Points</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Latitude: {item.latitude}, Longitude: {item.longitude}, Date: {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListData;
