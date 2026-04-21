import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Change URL later if deploy to prod
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useIoTTelemetry() {
  const [sensorData, setSensorData] = useState({
    soilMoisture: 45,
    temperature: 28,
    humidity: 60,
    nitrogen: 120,
    phosphorus: 45,
    potassium: 30,
  });
  
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('sensor_update', (data) => {
      setSensorData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { sensorData, isConnected };
}
