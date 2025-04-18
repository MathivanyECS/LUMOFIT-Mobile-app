
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const CallEmergencyScreen = ({ route }) => {
  const { patient } = route.params;
  const [isRecording, setIsRecording] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: 'Sarah Johnson',
    deviceId: 'LF-2025-089',
    isActive: true,
    lastSignal: '2 mins ago',
    signalStrength: 'Excellent'
  });

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // In a real app, you would implement voice recording functionality here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#E53935" />
        <Text style={styles.headerTitle}>Emergency Contact</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.contactCard}>
        <Image 
          source={require('../assets/Emegency_Contact.png')} 
          style={styles.contactImage}
        />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contactInfo.name}</Text>
          <View style={styles.deviceInfo}>
            <Text style={styles.deviceId}>Device ID: {contactInfo.deviceId}</Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: contactInfo.isActive ? '#4CAF50' : '#F44336' }]}></View>
              <Text style={styles.statusText}>Device Active</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Direct Call */}
      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call" size={20} color="#fff" />
        <Text style={styles.callButtonText}>Call LumoFit User</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Voice Note */}
      <View style={styles.voiceNoteCard}>
        <Text style={styles.cardTitle}>Send Voice Note</Text>
        <Text style={styles.cardDescription}>Record and send message to device</Text>
        
        <TouchableOpacity 
          style={[styles.recordButton, isRecording && styles.recordingActive]}
          onPress={handleRecord}
        >
          <Ionicons name="mic" size={24} color={isRecording ? "#fff" : "#E53935"} />
          <Text style={[styles.recordButtonText, isRecording && styles.recordingActiveText]}>
            {isRecording ? 'Recording...' : 'Hold to Record'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Device Signals */}
      <View style={styles.signalCard}>
        <Text style={styles.cardTitle}>Device Signals</Text>
        
        <View style={styles.signalInfo}>
          <View style={styles.signalRow}>
            <Text style={styles.signalLabel}>Last Signal Received</Text>
            <Text style={styles.signalValue}>{contactInfo.lastSignal}</Text>
          </View>
          
          <View style={styles.signalRow}>
            <Text style={styles.signalLabel}>Signal Strength</Text>
            <View style={styles.signalStrength}>
              <Text style={styles.signalValue}>{contactInfo.signalStrength}</Text>
              <View style={styles.signalBars}>
                <View style={styles.signalBar}></View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Emergency Footer */}
      <View style={styles.emergencyFooter}>
        <Text style={styles.emergencyLabel}>For immediate assistance</Text>
        <TouchableOpacity style={styles.emergencyCall}>
          <Text style={styles.emergencyCallText}>Emergency: 119</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935',
    marginLeft: 8,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  contactImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
  },
  contactInfo: {
    marginLeft: 16,
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  deviceInfo: {
    flexDirection: 'column',
  },
  deviceId: {
    fontSize: 14,
    color: '#757575',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  callButton: {
    backgroundColor: '#E53935',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 8,
  },
  voiceNoteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E53935',
  },
  recordingActive: {
    backgroundColor: '#E53935',
  },
  recordButtonText: {
    color: '#E53935',
    marginLeft: 8,
    fontWeight: '500',
  },
  recordingActiveText: {
    color: '#fff',
  },
  signalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signalInfo: {
    marginTop: 8,
  },
  signalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  signalLabel: {
    fontSize: 14,
    color: '#757575',
  },
  signalValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  signalStrength: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signalBars: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  signalBar: {
    height: 12,
    width: 3,
    backgroundColor: '#4CAF50',
    marginHorizontal: 1,
    borderRadius: 1,
  },
  emergencyFooter: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  emergencyLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  emergencyCall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  emergencyCallText: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CallEmergencyScreen;
