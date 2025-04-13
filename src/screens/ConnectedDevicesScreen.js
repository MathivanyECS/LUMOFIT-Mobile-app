import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../constants/routes';
import { COLORS } from '../constants/colors';

const ConnectedDevicesScreen = () => {
  const navigation = useNavigation();

  // Sample device data
  const devices = [
    {
      id: 1,
      name: 'LUMOFIT Device #1',
      connectedDate: 'Jan 15, 2025',
    },
    {
      id: 2,
      name: 'LUMOFIT Device #2',
      connectedDate: 'Feb 1, 2025',
    },
  ];

  // Sample users data
  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      connectedDate: 'Jan 20, 2025',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Michael Chen',
      connectedDate: 'Feb 5, 2025',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      connectedDate: 'Feb 10, 2025',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      status: 'Offline',
    },
  ];

  const handleUserPress = (user) => {
    navigation.navigate(ROUTES.USER_DETAILS, { user });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <Text style={styles.greeting}>Hello, <Text style={styles.username}>JohnDoe123</Text></Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-horizontal-circle-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Connected Devices Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connected Devices</Text>
        <View style={styles.cardsList}>
          {devices.map((device) => (
            <View key={device.id} style={styles.card}>
              <View style={styles.deviceIconContainer}>
                <Ionicons name="phone-portrait-outline" size={24} color={COLORS.primary} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{device.name}</Text>
                <Text style={styles.cardSubtitle}>Connected since: {device.connectedDate}</Text>
              </View>
              <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="ellipsis-vertical" size={20} color="#555" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Connected Users Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connected LUMOFIT Users</Text>
        <View style={styles.cardsList}>
          {users.map((user) => (
            <TouchableOpacity 
              key={user.id} 
              style={styles.card}
              onPress={() => handleUserPress(user)}
            >
              <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{user.name}</Text>
                <Text style={styles.cardSubtitle}>Connected since: {user.connectedDate}</Text>
              </View>
              <View style={styles.statusContainer}>
                <View 
                  style={[
                    styles.statusBadge, 
                    { backgroundColor: user.status === 'Active' ? '#e8f5e9' : '#f5f5f5' }
                  ]}
                >
                  <Text 
                    style={[
                      styles.statusText,
                      { color: user.status === 'Active' ? COLORS.primary : '#757575' }
                    ]}
                  >
                    {user.status}
                  </Text>
                </View>
                <TouchableOpacity style={styles.menuButton}>
                  <Ionicons name="ellipsis-vertical" size={20} color="#555" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  username: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  cardsList: {
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 12,
  },
  deviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  menuButton: {
    padding: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ConnectedDevicesScreen;