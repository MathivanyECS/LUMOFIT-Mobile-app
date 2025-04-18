
// screens/AlertsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES } from '../constants/routes';
import { COLORS } from '../constants/colors';

const AlertsScreen = ({ navigation }) => {
  // Mock data for alerts
  const alerts = [
    {
      id: '1',
      title: 'High Heart Rate Detected',
      description: 'Heart rate reached 105 bpm while at rest. This is above the normal resting rate.',
      time: 'Today, 10:23 AM',
      priority: 'high',
      patientId: '101',
      patientName: 'John Smith'
    },
    {
      id: '2',
      title: 'Low Activity Warning',
      description: 'Less than 500 steps recorded yesterday. Encourage more movement.',
      time: 'Yesterday, 5:17 PM',
      priority: 'medium',
      patientId: '101',
      patientName: 'John Smith'
    },
    {
      id: '3',
      title: 'Abnormal Sleep Pattern',
      description: 'Only 4.5 hours of sleep detected last night, below the recommended 7-8 hours.',
      time: 'Yesterday, 8:30 AM',
      priority: 'medium',
      patientId: '102',
      patientName: 'Mary Johnson'
    },
    {
      id: '4',
      title: 'Medication Reminder',
      description: 'Time to take blood pressure medication.',
      time: '2 days ago, 9:00 AM',
      priority: 'low',
      patientId: '102',
      patientName: 'Mary Johnson'
    },
    {
      id: '5',
      title: 'Fall Detected',
      description: 'Possible fall detected. Check in with the patient to ensure they are okay.',
      time: '3 days ago, 2:45 PM',
      priority: 'high',
      patientId: '103',
      patientName: 'Robert Brown'
    },
  ];

  // Function to get color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#E53935';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  // Function to get icon based on alert title
  const getAlertIcon = (title) => {
    if (title.includes('Heart')) return 'heart';
    if (title.includes('Activity')) return 'walk';
    if (title.includes('Sleep')) return 'bed';
    if (title.includes('Medication')) return 'medical';
    if (title.includes('Fall')) return 'alert-circle';
    return 'information-circle';
  };

  // Render each alert item
  const renderAlertItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.alertCard}
      onPress={() => {
        // Navigate to the health detail screen for this patient
        navigation.navigate(ROUTES.HEALTH_DETAIL, { 
          patient: { 
            id: item.patientId,
            name: item.patientName
          } 
        });
      }}
    >
      <View style={[styles.alertPriority, { backgroundColor: getPriorityColor(item.priority) }]} />
      <View style={styles.alertContent}>
        <View style={styles.alertHeader}>
          <View style={styles.alertTitleRow}>
            <Ionicons 
              name={getAlertIcon(item.title)} 
              size={20} 
              color={getPriorityColor(item.priority)} 
              style={styles.alertIcon}
            />
            <Text style={styles.alertTitle}>{item.title}</Text>
          </View>
          <Text style={styles.alertTime}>{item.time}</Text>
        </View>
        <Text style={styles.patientName}>Patient: {item.patientName}</Text>
        <Text style={styles.alertDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Alerts</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <View style={styles.filterChips}>
        <TouchableOpacity style={[styles.chip, styles.activeChip]}>
          <Text style={styles.activeChipText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chip}>
          <Text style={styles.chipText}>High Priority</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chip}>
          <Text style={styles.chipText}>Unread</Text>
        </TouchableOpacity>
      </View>

      {/* Alerts List */}
      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  filterChips: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#ECEFF1',
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: COLORS ? COLORS.primary : '#3949AB',
  },
  chipText: {
    fontSize: 14,
    color: '#757575',
  },
  activeChipText: {
    fontSize: 14,
    color: '#fff',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertPriority: {
    width: 4,
  },
  alertContent: {
    padding: 16,
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertIcon: {
    marginRight: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  alertTime: {
    fontSize: 12,
    color: '#757575',
  },
  patientName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS ? COLORS.primary : '#3949AB',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#333',
  },
});

export default AlertsScreen;