import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import QuizListSceen from '../screens/QuizListScreen/QuizListSceen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        options={{
          animation: 'slide_from_right',
        }}
        name="QuizList"
        component={QuizListSceen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
