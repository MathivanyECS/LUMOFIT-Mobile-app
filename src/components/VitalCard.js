import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const VitalCard = ({ title, value, unit, icon, status, iconColor }) => {
  const getStatusColor = () => {
    if (status === 'normal') return COLORS.success;
    if (status === 'warning') return '#FFA500'; // Orange
    if (status === 'danger') return COLORS.danger;
    return COLORS.info;
  };

  const getStatusIcon = () => {
    if (status === 'normal') return 'checkmark-circle';
    if (status === 'warning') return 'alert-circle';
    if (status === 'danger') return 'warning';
    return 'information-circle';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Ionicons name={getStatusIcon()} size={16} color={getStatusColor()} />
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {status === 'normal' ? 'Normal Range' : status === 'warning' ? 'Warning' : status === 'danger' ? 'Critical' : 'Normal Activity'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
    marginVertical: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '48%',
  },
  iconContainer: {
    borderRadius: 50,
    padding: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginRight: 4,
  },
  unit: {
    fontSize: 16,
    color: COLORS.text.light,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
  },
});

export default VitalCard;
