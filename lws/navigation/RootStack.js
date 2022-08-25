import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MainScreen from '../screens/MainScreen/MainScreen';
import QuizScreen from '../screens/QuizScreen/QuizScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen';
// import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen';
import ResultScreen from '../screens/ResultScreen/ResultScreen';
import SingleQuizScreen from '../screens/SingleQuizScreen/SingleQuizScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Main"
          component={MainScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
          name="Tab"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
          name="SingleQuiz"
          component={SingleQuizScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_left',
          }}
          name="Quiz"
          component={QuizScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_left',
          }}
          name="Result"
          component={ResultScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_left',
          }}
          name="Reset"
          component={ResetPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
