/* eslint-disable react-native/no-inline-styles */
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {primaryColor} from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import QuizListSceen from '../screens/QuizListScreen/QuizListSceen';
import LeaderBoardScreen from '../screens/LeaderBoardScreen/LeaderBoardScreen';
import ProfileStack from './ProfileStack';
import QuestionStack from './QuestionStack';
import AboutScreen from '../screens/AboutScreen/AboutScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      shifting={false}
      barStyle={{
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 5,
      }}
      activeColor={primaryColor}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
        name="QuizHome"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Developer',
          tabBarIcon: ({color, focused}) => (
            <Entypo name="code" size={24} color={focused ? color : '#2cfc03'} />
          ),
        }}
        name="Developer"
        component={AboutScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({size, focused, color}) => (
            <AntDesign
              name={focused ? 'pluscircle' : 'pluscircleo'}
              color={color}
              size={24}
            />
          ),
        }}
        name="Question"
        component={QuestionStack}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({color, focused}) => (
            <FontAwesome
              name="trophy"
              color={focused ? color : '#E3D21B'}
              size={24}
            />
          ),
        }}
        name="Leaderboard"
        component={LeaderBoardScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({color}) => (
            <AntDesign name="user" color={color} size={24} />
          ),
        }}
        name="User"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
