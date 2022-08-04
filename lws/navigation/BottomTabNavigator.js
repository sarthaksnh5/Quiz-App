/* eslint-disable react-native/no-inline-styles */
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {primaryColor} from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeStack from './HomeStack';
import QuizListSceen from '../screens/QuizListScreen/QuizListSceen';
import LeaderBoardScreen from '../screens/LeaderBoardScreen/LeaderBoardScreen';
import ProfileStack from './ProfileStack';
import QuestionStack from './QuestionStack';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      shifting={true}
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
          tabBarLabel: 'Favorite',
          tabBarIcon: ({color}) => (
            <AntDesign name="heart" color={color} size={24} />
          ),
        }}
        name="Favourite"
        component={QuizListSceen}
      />

        <Tab.Screen
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({size, focused, color}) => (
            <AntDesign name={focused ? "pluscircle" : "pluscircleo"} color={color} size={24} />
          ),
        }}
        name="Question"
        component={QuestionStack}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({color}) => (
            <FontAwesome name="trophy" color={color} size={24} />
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
