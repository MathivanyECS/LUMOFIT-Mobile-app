
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
      const data = response.data;

      setHealthData({
        bodyTemperature: data.bodyTemperature || { value: '--', unit: '°C', status: 'Unknown' },
        oxygenLevel: data.oxygenLevel || { value: '--', unit: '%', status: 'Unknown' },
        position: data.position || { value: '--', status: 'Unknown' },
        heartRate: data.heartRate || { value: '--', unit: 'BPM', status: 'Unknown' },
        stressLevel: data.stressLevel || { value: '--', status: 'Unknown' },
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
    }
  }, [patientId]);

  return (
    <DetailsContext.Provider value={{ healthData, loading, error, fetchHealthData }}>
      {children}
    </DetailsContext.Provider>
  );
};
