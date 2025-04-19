import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconPlaceholder from '../components/IconPlaceholder';

const HealthDetailPage = ({ route, navigation }) => {
  const { patient } = route.params;
  const [healthData, setHealthData] = useState({
    heartRate: {
      value: '--',
      unit: 'BPM',
      status: 'Unknown',
    },
    oxygenLevel: {
      value: '--',
      unit: '%',
      status: 'Unknown',
    },
    stressLevel: {
      value: '--',
      status: 'Unknown',
    },
  });

  const [recentAlerts, setRecentAlerts] = useState([]);

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
        // const response = await fetch(https://api.example.com/patients/${patient.id}/health);
        // const data = await response.json();

        // Simulated data for now
        const data = {
          heartRate: { value: 75, unit: 'BPM', status: 'Normal' },
          oxygenLevel: { value: 98, unit: '%', status: 'Normal' },
          stressLevel: { value: 'High', status: 'Alert' },
          recentAlerts: [
            {
              id: 'alert-1',
              type: 'High Alert',
              issue: 'Abnormal Heart Rate',
              value: '150 BPM - Above normal range',
              time: 'Today, 2:30 PM',
              color: '#F44336',
            },
            {
              id: 'alert-2',
              type: 'Medium Alert',
              issue: 'Blood Pressure Elevated',
              value: '135/90 - Slightly elevated',
              time: 'Today, 11:45 AM',
              color: '#FF9800',
            },
            {
              id: 'alert-3',
              type: 'Low Alert',
              issue: 'Low Blood Sugar',
              value: '68 mg/dL - Below normal range',
              time: 'Yesterday, 8:15 PM',
              color: '#FFC107',
            },
          ],
        };

        setHealthData({
          heartRate: data.heartRate,
          oxygenLevel: data.oxygenLevel,
          stressLevel: data.stressLevel,
        });
        setRecentAlerts(data.recentAlerts);
      } catch (err) {
        setError('Failed to load health data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();

    // Optionally, set up polling or subscription for live updates here

  }, [patient.id]);

  const handleCallEmergency = () => {
    // Placeholder for calling Lumofit user via API or hardware integration
    Alert.alert('Call Emergency', 'Calling Lumofit user for patient: ' + patient.name);
    // TODO: Integrate with actual call functionality
  };

  return (
    <ScrollView style={styles.container}>
      {/* Patient Profile */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <IconPlaceholder size={50} iconName="person" style={styles.profileImage} />

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{patient.name}</Text>
            <Text style={styles.profileId}>ID: {patient.id}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <View style={styles.infoItemHeader}>
              <Text style={styles.infoLabel}>Age</Text>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.infoValue}>{patient.age} years</Text>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoItemHeader}>
              <Text style={styles.infoLabel}>Gender</Text>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
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

      {/* Alert Notification */}
      {/* Removed alert notification as per user request */}

      {/* Recent Alerts */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Health Alerts</Text>
      </View>

      {recentAlerts.length === 0 ? (
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>No recent alerts.</Text>
      ) : (
        recentAlerts.map((alert) => (
          <View key={alert.id} style={[styles.alertCard, { borderLeftColor: alert.color }]}>
            <View style={styles.alertCardHeader}>
              <Text style={[styles.alertType, { color: alert.color }]}>{alert.type}</Text>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
            <Text style={styles.alertIssue}>{alert.issue}</Text>
            <Text style={styles.alertValue}>{alert.value}</Text>
          </View>
        ))
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
    backgroundColor: '#F5F7FA',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileId: {
    fontSize: 14,
    color: '#757575',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    backgroundColor: '#F5F7FA',
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  infoItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
  },
  addButton: {
    backgroundColor: '#3949AB',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vitalsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vitalItem: {
    padding: 16,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  vitalTitle: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 8,
  },
  vitalValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vitalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  alertNotification: {
    backgroundColor: '#263238',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  alertHeader: {
    backgroundColor: '#37474F',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  alertHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  alertMessage: {
    color: '#fff',
    padding: 16,
    paddingTop: 8,
  },
  contactButton: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#263238',
    fontWeight: 'bold',
  },
  alertCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  alertCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertType: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  alertTime: {
    fontSize: 12,
    color: '#757575',
  },
  alertIssue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  alertValue: {
    fontSize: 14,
    color: '#757575',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emergencyButton: {
    backgroundColor: '#F44336',
  },
  vitalsButton: {
    backgroundColor: '#3949AB',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default HealthDetailPage;