
// Create a new file at src/components/IconPlaceholder.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const IconPlaceholder = ({ 
  size = 50, 
  iconName = 'person', 
  backgroundColor = '#e0e0e0',
  iconColor = '#666',
  iconSize = 30
}) => {
  return (
    <View style={[
      styles.container, 
      { 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        backgroundColor
      }
    ]}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default IconPlaceholder;