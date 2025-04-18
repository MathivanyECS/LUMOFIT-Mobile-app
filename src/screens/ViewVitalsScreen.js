
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ViewVitalsScreen = ({ route }) => {
  const { patient } = route.params;
  const [timeRange, setTimeRange] = useState('weekly'); // weekly, monthly
  
  // Mock data for charts
  const heartRateData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 70, 80, 75, 85, 78, 75],
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };
  
  const oxygenData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [98, 97, 98, 99, 96, 97, 98],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };
  
  const stressData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [30, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>Health Vitals</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.timeSelector}>
          <TouchableOpacity 
            style={[styles.timeButton, timeRange === 'weekly' && styles.timeButtonActive]}
            onPress={() => setTimeRange('weekly')}
          >
            <Text style={[styles.timeButtonText, timeRange === 'weekly' && styles.timeButtonTextActive]}>
              Weekly
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.timeButton, timeRange === 'monthly' && styles.timeButtonActive]}
            onPress={() => setTimeRange('monthly')}
          >
            <Text style={[styles.timeButtonText, timeRange === 'monthly' && styles.timeButtonTextActive]}>
              Monthly
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.calendarButton}>
            <Ionicons name="calendar" size={18} color="#3949AB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Heart Rate */}
      <View style={styles.vitalSection}>
        <View style={styles.vitalHeader}>
          <View style={styles.vitalTitleContainer}>
            <Ionicons name="heart" size={20} color="#F44336" />
            <Text style={styles.vitalTitle}>Heart Rate</Text>
          </View>
          <Text style={styles.vitalCurrentValue}>75 bpm</Text>
        </View>
        
        <LineChart
          data={heartRateData}
          width={width - 32}
          height={180}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`
          }}
          bezier
          style={styles.chart}
        />
        
        <Text style={styles.chartCaption}>Average over the week</Text>
      </View>

      {/* Oxygen Level */}
      <View style={styles.vitalSection}>
        <View style={styles.vitalHeader}>
          <View style={styles.vitalTitleContainer}>
            <Ionicons name="fitness" size={20} color="#2196F3" />
            <Text style={styles.vitalTitle}>Oxygen Level</Text>
          </View>
          <Text style={styles.vitalCurrentValue}>98%</Text>
        </View>
        
        <LineChart
          data={oxygenData}
          width={width - 32}
          height={180}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`
          }}
          bezier
          style={styles.chart}
        />
        
        <Text style={styles.chartCaption}>Stable levels maintained</Text>
      </View>

      {/* Stress Patterns */}
      <View style={styles.vitalSection}>
        <View style={styles.vitalHeader}>
          <View style={styles.vitalTitleContainer}>
            <Ionicons name="brain" size={20} color="#9C27B0" />
            <Text style={styles.vitalTitle}>Stress Patterns</Text>
          </View>
          <Text style={styles.vitalCurrentValue}>Low</Text>
        </View>
        
        <LineChart
          data={stressData}
          width={width - 32}
          height={180}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`
          }}
          bezier
          style={styles.chart}
        />
        
        <Text style={styles.chartCaption}>Stress levels varying throughout the week</Text>
      </View>

      {/* Download Report */}
      <TouchableOpacity style={styles.downloadButton}>
        <Ionicons name="download" size={20} color="#fff" />
        <Text style={styles.downloadButtonText}>Download PDF Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  timeButtonActive: {
    backgroundColor: '#3949AB',
  },
  timeButtonText: {
    color: '#757575',
    fontWeight: '500',
  },
  timeButtonTextActive: {
    color: '#fff',
  },
  calendarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  vitalSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vitalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vitalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  vitalCurrentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  chartCaption: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
    marginTop: 4,
  },
  downloadButton: {
    backgroundColor: '#3949AB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ViewVitalsScreen;



