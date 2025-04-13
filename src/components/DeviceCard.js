import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const DeviceCard = ({ device, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="phone-portrait-outline" size={24} color={COLORS.primary} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{device.name}</Text>
        <Text style={styles.subtitle}>Connected since: {device.connectedSince}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.menuButton}>
        <Ionicons name="ellipsis-vertical" size={24} color={COLORS.gray} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: '#C8E6C9',
    borderRadius: 50,
    padding: 12,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  menuButton: {
    padding: 8,
  },
});

export default DeviceCard;