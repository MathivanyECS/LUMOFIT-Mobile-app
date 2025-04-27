
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tpyop7bhz5.execute-api.us-east-1.amazonaws.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const DetailsContext = createContext();

export const DetailsProvider = ({ children, patientId }) => {
  const [healthData, setHealthData] = useState({
    bodyTemperature: { value: '--', unit: '°C', status: 'Unknown' },
    oxygenLevel: { value: '--', unit: '%', status: 'Unknown' },
    position: { value: '--', status: 'Unknown' },
    heartRate: { value: '--', unit: 'BPM', status: 'Unknown' },
    stressLevel: { value: '--', status: 'Unknown' },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHealthData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      // Replace the endpoint below with the actual API endpoint to fetch health data for the patient
      const response = await api.get(`/getReadings?patientId=${id}`);
      const rawData  = response.data;

      setHealthData({
        bodyTemperature: rawData.bodyTemperature || { value: '--', unit: '°C', status: 'Unknown' },
        oxygenLevel: rawData.oxygenLevel || { value: '--', unit: '%', status: 'Unknown' },
        // Map orientation to position for frontend
        position: rawData.orientation ? {
          value: rawData.orientation.value || '--',
          status: rawData.orientation.status || 'Unknown'
        } : { value: '--', status: 'Unknown' },
        heartRate: rawData.heartRate || { value: '--', unit: 'BPM', status: 'Unknown' },
        stressLevel: rawData.stressLevel || { value: '--', status: 'Unknown' },
      });
    } catch (err) {
      setError('Failed to load health data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchHealthData(patientId);
      
      // Set up polling for real-time updates
      const interval = setInterval(() => {
        fetchHealthData(patientId);
      }, 30000); // Poll every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [patientId]);

  return (
    <DetailsContext.Provider value={{ healthData, loading, error, fetchHealthData }}>
      {children}
    </DetailsContext.Provider>
  );
};
