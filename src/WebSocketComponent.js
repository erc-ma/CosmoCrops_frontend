import React, { useState, useEffect } from 'react';

const WebSocketComponent = () => {
  const [data, setData] = useState({ temperature: 0, co2: 0 });

  useEffect(() => {
    const ws = new WebSocket('WEBSOCKET_SERVER_URL');

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Garden Data</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>CO2 Levels: {data.co2} ppm</p>
    </div>
  );
};

export default WebSocketComponent;
