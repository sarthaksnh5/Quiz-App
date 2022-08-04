import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AboutScreen from '../screens/AboutScreen/AboutScreen';
import ImageScreen from '../screens/ImageScreen/ImageScreen';
import UserScreen from '../screens/UserScreen/UserScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={UserScreen} />
      <Stack.Screen name="Image" component={ImageScreen} />
      <Stack.Screen name="Info" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
