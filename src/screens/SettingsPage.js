
// src/SettingsPage.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Linking,
} from 'react-native';
import { AuthContext } from '../Context/AuthProvider';
import { COLORS } from '../constants/colors';

const SettingsPage = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout } = useContext(AuthContext);

  const toggleSwitch = () => {
    setIsDarkMode(previousState => !previousState);
    // You can add logic to change the app's theme here
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('GetStarted'); // Navigate to the Get Started page
  };

  const openEmailApp = () => {
    Linking.openURL('mailto:Assistant@gmail.com'); // Updated email address
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Settings</Text>

      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Help Section</Text>
        <TouchableOpacity onPress={openEmailApp}>
          <Text style={[styles.link, isDarkMode && styles.darkLink]}>Contact Support: Assistant@gmail.com</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Mode</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, isDarkMode && styles.darkLabel]}>Light Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleSwitch}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  darkLabel: {
    color: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  link: {
    color: COLORS.secondary,
    fontSize: 16,
  },
  darkLink: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkTitle: {
    color: '#fff',
  },
});

export default SettingsPage;