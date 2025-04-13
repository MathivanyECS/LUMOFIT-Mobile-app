import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';


const DashboardScreen = ({ navigation, route }) => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isDeviceModalVisible, setDeviceModalVisible] = useState(false);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserAvatar, setNewUserAvatar] = useState(null);


  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, []);


  const loadSavedData = async () => {
    try {
      const savedDevices = await AsyncStorage.getItem('connectedDevices');
      const savedUsers = await AsyncStorage.getItem('connectedUsers');
     
      if (savedDevices) {
        setConnectedDevices(JSON.parse(savedDevices));
      }
     
      if (savedUsers) {
        setConnectedUsers(JSON.parse(savedUsers));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };


  const saveData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
   
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'You need to grant camera roll permissions to upload images.');
      return;
    }


    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });


    if (!result.canceled) {
      setNewUserAvatar(result.assets[0].uri);
    }
  };


  const addNewDevice = () => {
    if (newDeviceName.trim() === '') {
      Alert.alert('Input Required', 'Please enter a device name');
      return;
    }


    const newDevice = {
      id: Date.now().toString(),
      name: newDeviceName,
      connectedSince: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };


    const updatedDevices = [...connectedDevices, newDevice];
    setConnectedDevices(updatedDevices);
    saveData('connectedDevices', updatedDevices);
    setNewDeviceName('');
    setDeviceModalVisible(false);
  };


  const addNewUser = () => {
    if (newUserName.trim() === '') {
      Alert.alert('Input Required', 'Please enter a user name');
      return;
    }


    const newUser = {
      id: Date.now().toString(),
      name: newUserName,
      connectedSince: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: newUserAvatar,
      isActive: true
    };


    const updatedUsers = [...connectedUsers, newUser];
    setConnectedUsers(updatedUsers);
    saveData('connectedUsers', updatedUsers);
    setNewUserName('');
    setNewUserAvatar(null);
    setUserModalVisible(false);
  };


  const removeDevice = (id) => {
    const updatedDevices = connectedDevices.filter(device => device.id !== id);
    setConnectedDevices(updatedDevices);
    saveData('connectedDevices', updatedDevices);
  };


  const removeUser = (id) => {
    const updatedUsers = connectedUsers.filter(user => user.id !== id);
    setConnectedUsers(updatedUsers);
    saveData('connectedUsers', updatedUsers);
  };


  const toggleUserStatus = (id) => {
    const updatedUsers = connectedUsers.map(user => {
      if (user.id === id) {
        return { ...user, isActive: !user.isActive };
      }
      return user;
    });
   
    setConnectedUsers(updatedUsers);
    saveData('connectedUsers', updatedUsers);
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
     
      <View style={styles.header}>
        <View style={styles.userInfo}>
        
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Hello,</Text>
            <Text style={styles.username}>JohnDoe123</Text>
          </View>
        </View>
       
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
     
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Connected Devices</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setDeviceModalVisible(true)}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
         
          {connectedDevices.length === 0 ? (
            <Text style={styles.emptyListText}>No devices connected. Tap + to add a device.</Text>
          ) : (
            connectedDevices.map(device => (
              <View key={device.id} style={styles.deviceCard}>
                <View style={styles.deviceLeftSection}>
                  <View style={styles.deviceIconContainer}>
                    <MaterialCommunityIcons name="cellphone" size={24} color={COLORS.secondary} />
                  </View>
                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceDate}>Connected since: {device.connectedSince}</Text>
                  </View>
                </View>
               
                <TouchableOpacity onPress={() => removeDevice(device.id)}>
                  <Ionicons name="trash-outline" size={20} color="#ff3b30" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
       
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Connected LUMOFIT Users</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setUserModalVisible(true)}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
         
          {connectedUsers.length === 0 ? (
            <Text style={styles.emptyListText}>No users connected. Tap + to add a user.</Text>
          ) : (
            connectedUsers.map(user => (
              <View key={user.id} style={styles.userCard}>
                <View style={styles.userLeftSection}>
                  {user.avatar ? (
                    <Image source={{ uri: user.avatar }} style={styles.userCardAvatar} />
                  ) : (
                    <View style={[styles.userCardAvatar, styles.placeholderAvatar]}>
                      <Text style={styles.placeholderText}>{user.name.charAt(0)}</Text>
                    </View>
                  )}
                  <View style={styles.userCardInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userDate}>Connected since: {user.connectedSince}</Text>
                  </View>
                </View>
               
                <View style={styles.userRightSection}>
                  <TouchableOpacity
                    style={[styles.statusBadge, user.isActive ? styles.activeBadge : styles.offlineBadge]}
                    onPress={() => toggleUserStatus(user.id)}
                  >
                    <Text style={[styles.statusText, user.isActive ? styles.activeText : styles.offlineText]}>
                      {user.isActive ? 'Active' : 'Offline'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeUser(user.id)}>
                    <Ionicons name="trash-outline" size={20} color="#ff3b30" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>


      {/* Add Device Modal */}
      <Modal
        visible={isDeviceModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Device</Text>
           
            <TextInput
              style={styles.input}
              placeholder="Device Name"
              value={newDeviceName}
              onChangeText={setNewDeviceName}
            />
           
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setNewDeviceName('');
                  setDeviceModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
             
              <TouchableOpacity
                style={[styles.modalButton, styles.addButtonModal]}
                onPress={addNewDevice}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      {/* Add User Modal */}
      <Modal
        visible={isUserModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New User</Text>
           
            <TouchableOpacity style={styles.avatarPicker} onPress={pickImage}>
              {newUserAvatar ? (
                <Image source={{ uri: newUserAvatar }} style={styles.pickedAvatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="camera" size={32} color="#999" />
                  <Text style={styles.avatarText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
           
            <TextInput
              style={styles.input}
              placeholder="User Name"
              value={newUserName}
              onChangeText={setNewUserName}
            />
           
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setNewUserName('');
                  setNewUserAvatar(null);
                  setUserModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
             
              <TouchableOpacity
                style={[styles.modalButton, styles.addButtonModal]}
                onPress={addNewUser}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#f2f7f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeContainer: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  addButton: {
    padding: 4,
  },
  emptyListText: {
    textAlign: 'center',
    color: '#888',
    padding: 16,
  },
  deviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0,
    marginBottom: 4,
  },
  deviceLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6f7ef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceInfo: {
    marginLeft: 12,
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  deviceDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 4,
  },
  userLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userCardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholderAvatar: {
    backgroundColor: '#e6f7ef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  userCardInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  userRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 12,
  },
  activeBadge: {
    backgroundColor: '#e6f7ef',
  },
  offlineBadge: {
    backgroundColor: '#f2f2f2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeText: {
    color: COLORS.secondary || '#4caf50',
  },
  offlineText: {
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  addButtonModal: {
    backgroundColor: COLORS.secondary || '#4caf50',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  avatarPicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  avatarText: {
    marginTop: 4,
    fontSize: 12,
    color: '#999',
  },
  pickedAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});


export default DashboardScreen;