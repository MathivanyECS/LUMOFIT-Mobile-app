import React from 'react';
import { StatusBar, SafeAreaView, LogBox } from 'react-native';
import AppNavigator from '../../src/navigation/AppNavigator';
import { COLORS } from '../../src/constants/colors';


// Ignore specific warnings if needed
LogBox.ignoreLogs(['Reanimated 2']);


const App = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </>
  );
};


export default App;