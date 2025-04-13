import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const AlertItem = ({ alert, onPress }) => {
  const getAlertIcon = () => {
    if (alert.type === 'emergency') return 'warning';
    if (alert.type === 'warning') return 'alert-circle';
    return 'information-circle';
  };

  const getAlertColor = () => {
    if (alert.type === 'emergency') return COLORS.danger;
    if (alert.type === 'warning') return '#FFA500'; // Orange
    return COLORS.info;
  };

  return (
    <TouchableOpacity style={[styles.container, { borderLeftColor: getAlertColor() }]} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: `${getAlertColor()}20` }]}>
        <Ionicons name={getAlertIcon()} size={20} color={getAlertColor()} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.time}>{alert.time}</Text>
      </View>
      <View style={styles.actionButton}>
        <Text style={styles.actionText}>View Details</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 8,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: COLORS.text.light,
  },
  actionButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default AlertItem;
