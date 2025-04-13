import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES } from '../constants/routes';
import { COLORS } from '../constants/colors';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ConnectedDevicesScreen from '../screens/ConnectedDevicesScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import AlertDetailScreen from '../screens/AlertDetailScreen';

// Import AuthContext
import { AuthContext ,AuthProvider} from '../Context/AuthProvider';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator for authenticated users
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === ROUTES.DASHBOARD) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === ROUTES.CONNECTED_DEVICES) {
            iconName = focused ? 'bluetooth' : 'bluetooth-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
      <Tab.Screen
        name={ROUTES.CONNECTED_DEVICES}
        component={ConnectedDevicesScreen}
        options={{ title: 'Connected Devices' }}
      />
    </Tab.Navigator>
  );
};

// Main stack navigator
const AppNavigator = () => {
  const { userToken,isLoading } = useContext(AuthContext);  // Get userToken from AuthContext

  if (isLoading) {
    return null; // You can replace this with a loading screen if needed
  }


  return (
    <Stack.Navigator
      initialRouteName={userToken ? ROUTES.MAIN_TABS : ROUTES.SPLASH} // Initial screen is Splash
      screenOptions={{
        headerShown: false,
      }}
    >
      {userToken ? (
        // If user is logged in, show the main tabs (DashboardScreen)
        <Stack.Screen name={ROUTES.MAIN_TABS} component={MainTabNavigator} />
      ) : (
        <>
          <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
          <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
          <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
        </>
      )}
      {/* Always accessible screens */}
      <Stack.Screen name={ROUTES.USER_DETAILS} component={UserDetailsScreen} />
      <Stack.Screen name={ROUTES.ALERT_DETAIL} component={AlertDetailScreen} />
    </Stack.Navigator>
  );
};

// Wrap the entire app inside AuthProvider to provide context
export default function AppNavigatorWrapper() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
