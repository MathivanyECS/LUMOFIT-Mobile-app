import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const Header = ({ title, showBackButton, onBackPress, showNotification, profile, onProfilePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        )}
        {profile ? (
          <View style={styles.profileContainer}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Hello,</Text>
              <Text style={styles.username}>{profile.name}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
      <View style={styles.rightContainer}>
        {showNotification && (
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        )}
        {profile && !showBackButton && (
          <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
            <Image source={{ uri: profile.avatar }} style={styles.profileButton} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  iconButton: {
    padding: 8,
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
});

export default Header;