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
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/routes';
import DateTimePicker from '@react-native-community/datetimepicker';

const DashboardScreen = ({ navigation, route }) => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isDeviceModalVisible, setDeviceModalVisible] = useState(false);
  const [isPatientModalVisible, setPatientModalVisible] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');

  // Patient form states
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientAvatar, setPatientAvatar] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [medicalCondition, setMedicalCondition] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedDevices = await AsyncStorage.getItem('connectedDevices');
      const savedPatients = await AsyncStorage.getItem('patients');

      if (savedDevices) {
        setConnectedDevices(JSON.parse(savedDevices));
      }

      if (savedPatients) {
        setPatients(JSON.parse(savedPatients));
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
      setPatientAvatar(result.assets[0].uri);
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
      connectedSince: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    const updatedDevices = [...connectedDevices, newDevice];
    setConnectedDevices(updatedDevices);
    saveData('connectedDevices', updatedDevices);
    setNewDeviceName('');
    setDeviceModalVisible(false);
  };

  const addNewPatient = () => {
    if (patientName.trim() === '') {
      Alert.alert('Input Required', 'Please enter patient name');
      return;
    }

    const newPatient = {
      id: Date.now().toString(),
      name: patientName,
      age: patientAge,
      gender: patientGender,
      avatar: patientAvatar,
      birthDate: birthDate ? birthDate.toISOString().split('T')[0] : null, // format: YYYY-MM-DD
      medicalCondition,
      bloodType,
      emergencyContact,
      addedOn: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      isActive: true,
    };

    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    saveData('patients', updatedPatients);
    resetPatientForm();
    setPatientModalVisible(false);
  };

  const resetPatientForm = () => {
    setPatientName('');
    setPatientAge('');
    setPatientGender('');
    setPatientAvatar(null);
    setBirthDate(new Date());
    setMedicalCondition('');
    setBloodType('');
    setEmergencyContact('');
  };

  const onChangeBirthDate = (event, selectedDate) => {
    console.log('Date selected:', selectedDate);
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setBirthDate(selectedDate);

      // Calculate age based on birthdate
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear();
      const m = today.getMonth() - selectedDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }
      setPatientAge(age.toString());
    }
  };

  const removeDevice = (id) => {
    const updatedDevices = connectedDevices.filter((device) => device.id !== id);
    setConnectedDevices(updatedDevices);
    saveData('connectedDevices', updatedDevices);
  };

  const removePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
    saveData('patients', updatedPatients);
  };

  const togglePatientStatus = (id) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id === id) {
        return { ...patient, isActive: !patient.isActive };
      }
      return patient;
    });

    setPatients(updatedPatients);
    saveData('patients', updatedPatients);
  };

  const navigateToPatientDetails = (patient) => {
    navigation.navigate('HealthDetail', { patient });
  };

  const renderGenderSelection = () => {
    const genders = ['Male', 'Female', 'Other'];

    return (
      <View style={styles.genderContainer}>
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender}
            style={[styles.genderOption, patientGender === gender && styles.selectedGender]}
            onPress={() => setPatientGender(gender)}
          >
            <Text style={[styles.genderText, patientGender === gender && styles.selectedGenderText]}>{gender}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderBloodTypeSelection = () => {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    return (
      <View style={styles.bloodTypeContainer}>
        {bloodTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.bloodTypeOption, bloodType === type && styles.selectedBloodType]}
            onPress={() => setBloodType(type)}
          >
            <Text style={[styles.bloodTypeText, bloodType === type && styles.selectedBloodTypeText]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
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
            <TouchableOpacity style={styles.addButton} onPress={() => setDeviceModalVisible(true)}>
              <Ionicons name="add-circle" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {connectedDevices.length === 0 ? (
            <Text style={styles.emptyListText}>No devices connected. Tap + to add a device.</Text>
          ) : (
            connectedDevices.map((device) => (
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
            <Text style={styles.sectionTitle}>Patients</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setPatientModalVisible(true)}>
              <Ionicons name="add-circle" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {patients.length === 0 ? (
            <Text style={styles.emptyListText}>No patients added. Tap + to add a patient.</Text>
          ) : (
            patients.map((patient) => (
              <TouchableOpacity
                key={patient.id}
                style={styles.userCard}
                onPress={() => navigateToPatientDetails(patient)}
              >
                <View style={styles.userLeftSection}>
                  {patient.avatar ? (
                    <Image source={{ uri: patient.avatar }} style={styles.userCardAvatar} />
                  ) : (
                    <View style={[styles.userCardAvatar, styles.placeholderAvatar]}>
                      <Text style={styles.placeholderText}>{patient.name.charAt(0)}</Text>
                    </View>
                  )}
                  <View style={styles.userCardInfo}>
                    <Text style={styles.userName}>{patient.name}</Text>
                    <Text style={styles.userDate}>
                      {patient.age} yrs • {patient.gender} • {patient.bloodType || 'Unknown Blood Type'}
                    </Text>
                  </View>
                </View>

                <View style={styles.userRightSection}>
                  <TouchableOpacity
                    style={[styles.statusBadge, patient.isActive ? styles.activeBadge : styles.offlineBadge]}
                    onPress={(e) => {
                      e.stopPropagation();
                      togglePatientStatus(patient.id);
                    }}
                  >
                    <Text style={[styles.statusText, patient.isActive ? styles.activeText : styles.offlineText]}>
                      {patient.isActive ? 'Active' : 'Offline'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      removePatient(patient.id);
                    }}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ff3b30" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Add Device Modal */}
      <Modal visible={isDeviceModalVisible} transparent={true} animationType="slide">
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

              <TouchableOpacity style={[styles.modalButton, styles.addButtonModal]} onPress={addNewDevice}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Patient Modal */}
      <Modal visible={isPatientModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.patientModalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Add New Patient</Text>

              <TouchableOpacity style={styles.avatarPicker} onPress={pickImage}>
                {patientAvatar ? (
                  <Image source={{ uri: patientAvatar }} style={styles.pickedAvatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person-add" size={32} color="#999" />
                    <Text style={styles.avatarText}>Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter patient's full name"
                  value={patientName}
                  onChangeText={setPatientName}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dateText}>
                    {birthDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                  <Ionicons name="calendar" size={24} color={COLORS.secondary} />
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={birthDate}
                    mode="date"
                    display="spinner"
                    onChange={onChangeBirthDate}
                    maximumDate={new Date()}
                  />
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Age (calculated from DOB)"
                  value={patientAge}
                  onChangeText={setPatientAge}
                  keyboardType="numeric"
                  editable={false}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Gender</Text>
                {renderGenderSelection()}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Blood Type</Text>
                {renderBloodTypeSelection()}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Medical Condition</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter medical conditions, allergies, etc."
                  value={medicalCondition}
                  onChangeText={setMedicalCondition}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Emergency Contact</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Emergency contact number"
                  value={emergencyContact}
                  onChangeText={setEmergencyContact}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    resetPatientForm();
                    setPatientModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.modalButton, styles.addButtonModal]} onPress={addNewPatient}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
  patientModalContent: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
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
    alignSelf: 'center',
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
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedGender: {
    borderColor: COLORS.secondary,
    backgroundColor: '#e6f7ef',
  },
  genderText: {
    fontSize: 14,
    color: '#666',
  },
  selectedGenderText: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  bloodTypeOption: {
    width: '23%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: '1%',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedBloodType: {
    borderColor: COLORS.secondary,
    backgroundColor: '#e6f7ef',
  },
  bloodTypeText: {
    fontSize: 14,
    color: '#666',
  },
  selectedBloodTypeText: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  datePickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DashboardScreen;