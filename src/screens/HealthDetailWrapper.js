
import React from 'react';
import { DetailsProvider } from '../Context/DetailsProvider';
import HealthDetailPage from '../screens/HealthDetailPage';

const HealthDetailWrapper = ({ route, navigation }) => {
  const { patient } = route.params;
  console.log("asslkjdhasiudhggsadhgsahkfsf   seifduhsdifhisdfihsdfashdb        wdsfhsdahbfsdabflhbsdkhfbhlk                fksjdbfksdabfksbadfkhbsadhfbshadfb" + patient.patientID);
  return (
    <DetailsProvider patientId={patient.patientID}>
      <HealthDetailPage route={route} navigation={navigation} />
    </DetailsProvider>
  );
};

export default HealthDetailWrapper;