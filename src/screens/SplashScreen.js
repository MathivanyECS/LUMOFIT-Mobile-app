import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/routes';

const SplashScreen = ({ navigation }) => {






  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          LUM
          <Image 
            source={require('../assets/lightbulb.png')} 
            style={styles.logoIcon} 
            resizeMode="contain"
          />
          FIT
        </Text>
        <Text style={styles.tagline}>Stay Aligned, Stay Healthy</Text>
      </View>
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
      >
        <LinearGradient
          colors={COLORS.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
    letterSpacing: 1,
  },
  logoIcon: {
    width: 36,
    height: 36,
    tintColor: COLORS.secondary,
  },
  tagline: {
    fontSize: 18,
    fontWeight:'600',
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '60%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SplashScreen;