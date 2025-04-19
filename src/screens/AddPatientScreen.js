
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddPatientScreen = ({ navigation }) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [medications, setMedications] = useState('');
  const [patientAvatar, setPatientAvatar] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [bloodType, setBloodType] = useState('');

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

  const onChangeBirthDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
    
    // Calculate age based on birthdate
    if (selectedDate) {
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear();
      const m = today.getMonth() - selectedDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }
      setPatientAge(age.toString());
    }
  };

  const savePatient = async () => {
    if (patientName.trim() === '') {
      Alert.alert('Input Required', 'Please enter patient name');
      return;
    }

    try {
      // Create new patient object
      const newPatient = {
        id: Date.now().toString(),
        name: patientName,
        age: patientAge,
        gender: patientGender,
        medicalCondition,
        medications,
        avatar: patientAvatar,
        birthDate: birthDate.toISOString(),
        emergencyContact,
        bloodType,
        addedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      // Get existing patients or initialize empty array
      const savedPatientsJSON = await AsyncStorage.getItem('patients');
      const savedPatients = savedPatientsJSON ? JSON.parse(savedPatientsJSON) : [];
      
      // Add new patient and save
      const updatedPatients = [...savedPatients, newPatient];
      await AsyncStorage.setItem('patients', JSON.stringify(updatedPatients));
      
      Alert.alert(
        'Success',
        'Patient added successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error saving patient:', error);
      Alert.alert('Error', 'Failed to save patient information');
    }
  };

  const renderGenderSelection = () => {
    const genders = ['Male', 'Female', 'Other'];
    
    return (
      <View style={styles.genderContainer}>
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender}
            style={[
              styles.genderOption,
              patientGender === gender && styles.selectedGender
            ]}
            onPress={() => setPatientGender(gender)}
          >
            <Text 
              style={[
                styles.genderText,
                patientGender === gender && styles.selectedGenderText
              ]}
            >
              {gender}
            </Text>
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
            style={[
              styles.bloodTypeOption,
              bloodType === type && styles.selectedBloodType
            ]}
            onPress={() => setBloodType(type)}
          >
            <Text 
              style={[
                styles.bloodTypeText,
                bloodType === type && styles.selectedBloodTypeText
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Patient</Text>
        <View style={styles.placeholder} />
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            {patientAvatar ? (
              <Image source={{ uri: patientAvatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person-add" size={40} color="#999" />
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
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {birthDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              <Ionicons name="calendar" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                value={birthDate}
                mode="date"
                display="default"
                onChange={onChangeBirthDate}
                maximumDate={new Date()}
              />
            )}
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age (automatically calculated from DOB)"
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
            <Text style={styles.label}>Current Medications</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="List current medications and dosages"
              value={medications}
              onChangeText={setMedications}
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
          
          <TouchableOpacity style={styles.saveButton} onPress={savePatient}>
            <Text style={styles.saveButtonText}>Save Patient</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#f2f7f6',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  avatarText: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    height: 50,
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
    fontSize: 16,
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
    height: 44,
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
    fontSize: 16,
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
  saveButton: {
    height: 56,
    backgroundColor: COLORS.primary || '#4285f4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default AddPatientScreen;