import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconPlaceholder from '../components/IconPlaceholder';

const HealthDetailPage = ({ route, navigation }) => {
  const { patient } = route.params;
  const [healthData, setHealthData] = useState({
    bodyTemperature: {
      value: '--',
      unit: '°C',
      status: 'Unknown',
    },
    oxygenLevel: {
      value: '--',
      unit: '%',
      status: 'Unknown',
    },
    position: {
      value: '--',
      status: 'Unknown',
    },
    heartRate: {
      value: '--',
      unit: 'BPM',
      status: 'Unknown',
    },
    stressLevel: {
      value: '--',
      status: 'Unknown',
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Placeholder for future API call to fetch real-time health data and alerts
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: Replace with actual API call to fetch health data for patient.id
        // Example:
        //const response = await fetch(https:tpyop7bhz5.execute-api.us-east-1.amazonaws.com/getReadings);
         //const data = await response.json();

        // Simulated data for now
        const data = {
          bodyTemperature: { value: 35, unit: '°C', status: 'Normal' },
          oxygenLevel: { value: 98, unit: '%', status: 'Normal' },
          position: { value: 'Sitting', status: 'Normal' },
          heartRate: { value: 75, unit: 'BPM', status: 'Normal' },
          stressLevel: { value: 'High', status: 'Alert' },
        };

        setHealthData({
          bodyTemperature: data.bodyTemperature,
          oxygenLevel: data.oxygenLevel,
          position: data.position,
          heartRate: data.heartRate,
          stressLevel: data.stressLevel,
        });
      } catch (err) {
        setError('Failed to load health data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();

    // Optionally, set up polling or subscription for live updates here

  }, [patient.id]);

  return (
    <ScrollView style={styles.container}>
      {/* Patient Profile */}
      <View style={styles.profileCard}>
      <View style={styles.profileHeader}>
  {patient.avatar ? (
    <Image source={{ uri: patient.avatar }} style={styles.profileImage} />
  ) : (
    <IconPlaceholder size={70} iconName="person" style={styles.profileImage} />
  )}
  <View style={styles.profileInfo}>
    <Text style={styles.profileName}>{patient.fullName}</Text>
    <Text style={styles.profileId}>ID: {patient.id}</Text>
  </View>
</View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{patient.age} years</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{patient.gender}</Text>
          </View>
        </View>
      </View>

      {/* Live Body Conditions */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Live Body Conditions</Text>
      </View>

      {loading ? (
        <Text style={{ textAlign: 'center', marginVertical: 20 }}>Loading health data...</Text>
      ) : error ? (
        <Text style={{ textAlign: 'center', marginVertical: 20, color: 'red' }}>{error}</Text>
      ) : (
        <View style={styles.vitalsCard}>
          <View style={styles.vitalItem}>
            <View style={styles.vitalHeader}>
              <Ionicons name="thermometer" size={20} color="#FF5722" />
              <Text style={styles.vitalTitle}>Body Temperature</Text>
            </View>
            <View style={styles.vitalValueContainer}>
              <Text style={styles.vitalValue}>
                {healthData.bodyTemperature.value} {healthData.bodyTemperature.unit}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      healthData.bodyTemperature.status === 'Normal' ? '#E8F5E9' : '#FFEBEE',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        healthData.bodyTemperature.status === 'Normal' ? '#4CAF50' : '#F44336',
                    },
                  ]}
                >
                  {healthData.bodyTemperature.status}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.vitalItem}>
            <View style={styles.vitalHeader}>
              <Ionicons name="fitness" size={20} color="#2196F3" />
              <Text style={styles.vitalTitle}>Oxygen Level</Text>
            </View>
            <View style={styles.vitalValueContainer}>
              <Text style={styles.vitalValue}>
                {healthData.oxygenLevel.value}
                {healthData.oxygenLevel.unit}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      healthData.oxygenLevel.status === 'Normal' ? '#E8F5E9' : '#FFEBEE',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        healthData.oxygenLevel.status === 'Normal' ? '#4CAF50' : '#F44336',
                    },
                  ]}
                >
                  {healthData.oxygenLevel.status}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.vitalItem}>
            <View style={styles.vitalHeader}>
              <Ionicons name="navigate" size={20} color="#009688" />
              <Text style={styles.vitalTitle}>Position</Text>
            </View>
            <View style={styles.vitalValueContainer}>
              <Text style={styles.vitalValue}>{healthData.position.value}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      healthData.position.status === 'Normal' ? '#E8F5E9' : '#FFEBEE',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        healthData.position.status === 'Normal' ? '#4CAF50' : '#F44336',
                    },
                  ]}
                >
                  {healthData.position.status}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.vitalItem}>
            <View style={styles.vitalHeader}>
              <Ionicons name="heart" size={20} color="#F44336" />
              <Text style={styles.vitalTitle}>Heart Rate</Text>
            </View>
            <View style={styles.vitalValueContainer}>
              <Text style={styles.vitalValue}>
                {healthData.heartRate.value} {healthData.heartRate.unit}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      healthData.heartRate.status === 'Normal' ? '#E8F5E9' : '#FFEBEE',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        healthData.heartRate.status === 'Normal' ? '#4CAF50' : '#F44336',
                    },
                  ]}
                >
                  {healthData.heartRate.status}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.vitalItem}>
            <View style={styles.vitalHeader}>
              <Ionicons name="brain" size={20} color="#9C27B0" />
              <Text style={styles.vitalTitle}>Stress Level</Text>
            </View>
            <View style={styles.vitalValueContainer}>
              <Text style={styles.vitalValue}>{healthData.stressLevel.value}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      healthData.stressLevel.status === 'Normal' ? '#E8F5E9' : '#FFEBEE',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        healthData.stressLevel.status === 'Normal' ? '#4CAF50' : '#F44336',
                    },
                  ]}
                >
                  {healthData.stressLevel.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.emergencyButton]}
          onPress={() => navigation.navigate('CallEmergency', { patient })}
        >
          <Ionicons name="call" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Call Emergency</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.vitalsButton]}
          onPress={() => navigation.navigate('ViewVitals', { patient })}
        >
          <Ionicons name="pulse" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>View Vitals</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#00000033',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#D1D9E6',
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  profileId: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    backgroundColor: '#E8EDF7',
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  vitalsCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#00000033',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  vitalItem: {
    padding: 20,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  vitalTitle: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
    fontWeight: '600',
  },
  vitalValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#D1D9E6',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
    marginHorizontal: 6,
    shadowColor: '#00000033',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  emergencyButton: {
    backgroundColor: '#E53935',
  },
  vitalsButton: {
    backgroundColor: '#3949AB',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 12,
    fontSize: 16,
  },
});

export default HealthDetailPage;