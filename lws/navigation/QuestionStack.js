import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AnswerQuestionScreen from '../screens/AnswerQuestionScreen/AnswerQuestionScreen';
import NewQuestionScreen from '../screens/NewQuestionScreen/NewQuestionScreen';
import QuestionScreen from '../screens/QuestionScreen/QuestionScreen';

const Stack = createNativeStackNavigator();

const QuestionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ques" component={QuestionScreen} />
      <Stack.Screen name="AddQues" component={NewQuestionScreen} />
      <Stack.Screen name="AnswerQues" component={AnswerQuestionScreen} />
    </Stack.Navigator>
  );
};

export default QuestionStack;
