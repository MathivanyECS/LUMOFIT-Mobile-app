
import React from 'react';
import { DetailsProvider } from '../Context/DetailsProvider';
import HealthDetailPage from '../screens/HealthDetailPage';

const HealthDetailWrapper = ({ route, navigation }) => {
  const { patient } = route.params;
  return (
    <DetailsProvider patientId={patient.id}>
      <HealthDetailPage route={route} navigation={navigation} />
    </DetailsProvider>
  );
};

export default HealthDetailWrapper;