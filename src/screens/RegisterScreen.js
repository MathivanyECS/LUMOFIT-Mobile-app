import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { COLORS } from '../constants/colors';
import { AuthContext } from '../Context/AuthProvider';

// Registration Success Component added inline
const RegistrationSuccess = ({ visible, onClose, onLogin, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={successStyles.centeredView}>
        <View style={successStyles.modalView}>
          <View style={successStyles.iconContainer}>
            <View style={successStyles.checkCircle}>
              <Text style={successStyles.checkmark}>✓</Text>
            </View>
          </View>
          
          <Text style={successStyles.modalTitle}>Registration Successful!</Text>
          <Text style={successStyles.modalMessage}>{message}</Text>
          
          <View style={successStyles.buttonContainer}>
            <TouchableOpacity
              style={[successStyles.button, successStyles.loginButton]}
              onPress={onLogin}
            >
              <Text style={successStyles.loginButtonText}>Login Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[successStyles.button, successStyles.closeButton]}
              onPress={onClose}
            >
              <Text style={successStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register, isLoading,  clearRegistrationSuccess,registrationSuccess } = useContext(AuthContext);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  
  // Add local state for registration success in case AuthContext doesn't provide it
  const [localRegistrationSuccess, setLocalRegistrationSuccess] = useState(false);
  
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;

  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const userData = {
      fullName,
      email,
      password,
      nickname,
      dateOfBirth: formatDate(dateOfBirth),
      gender,
    };

    try {
      const result = await register(userData);
      if (result.success) {
       //Alert.alert("the registration flag is" + registrationSuccess);
      } else {
        Alert.alert('Registration Failed', result.error || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Registration Failed', error.message || 'An unexpected error occurred');
    }
  };

  const handleLoginRedirect = () => {
    if (clearRegistrationSuccess) {
      clearRegistrationSuccess();
    } else {
      setLocalRegistrationSuccess(false);
    }
   navigation.navigate('Login');

   navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
  };

  const handleCloseSuccess = () => {
    if (clearRegistrationSuccess) {
      clearRegistrationSuccess();
    } else {
      setLocalRegistrationSuccess(false);
    }
    navigation.navigate('Login');
  };



  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create your account</Text>
          <Text style={styles.subHeaderText}>Join LUMOFIT today</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.labelText}>Full Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#AAAAAA"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <Text style={styles.labelText}>Email Address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#AAAAAA"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.labelText}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#AAAAAA"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Text style={styles.labelText}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#AAAAAA"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <Text style={styles.labelText}>Nickname</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your nickname"
              placeholderTextColor="#AAAAAA"
              value={nickname}
              onChangeText={setNickname}
            />
          </View>

          <Text style={styles.labelText}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{formatDate(dateOfBirth)}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Text style={styles.labelText}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'Male' && styles.selectedGender,
              ]}
              onPress={() => setGender('Male')}>
              <View style={styles.radioCircle}>
                {gender === 'Male' && <View style={styles.selectedRadio} />}
              </View>
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'Female' && styles.selectedGender,
              ]}
              onPress={() => setGender('Female')}>
              <View style={styles.radioCircle}>
                {gender === 'Female' && <View style={styles.selectedRadio} />}
              </View>
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'Other' && styles.selectedGender,
              ]}
              onPress={() => setGender('Other')}>
              <View style={styles.radioCircle}>
                {gender === 'Other' && <View style={styles.selectedRadio} />}
              </View>
              <Text style={styles.genderText}>Other</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={styles.registerButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLinkText}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Registration Success Modal */}
      <RegistrationSuccess
        visible={registrationSuccess}
        onClose={handleCloseSuccess}
        onLogin={handleLoginRedirect}
        message="Your LUMOFIT account has been created successfully! You can now login to access all features."
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 20,
    color: COLORS.gray,
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 5,
  },
  formContainer: {
    marginTop: 10,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.text,
  },
  datePickerButton: {
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.text,
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  genderText: {
    fontSize: 16,
    color: COLORS.text,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  loginText: {
    color: COLORS.text,
    marginRight: 5,
  },
  loginLinkText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

// Styles for the success modal
const successStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 15,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  button: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#f2f2f2',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButtonText: {
    color: COLORS.text,
    fontSize: 16,
  },
});

export default RegisterScreen;
