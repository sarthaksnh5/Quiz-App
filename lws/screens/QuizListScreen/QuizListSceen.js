import {StyleSheet} from 'react-native';
import React from 'react';
import Background from '../../component/Background';
import QuizScreenHeader from './QuizScreenHeader';
import QuizList from './QuizList';

const QuizListSceen = ({navigation}) => {
  return (
    <Background>
      <QuizScreenHeader
        goBack={() => {
          navigation.goBack();
        }}
      />
      <QuizList
        onPress={subject => {
          navigation.navigate('SingleQuiz', {subject});
        }}
      />
    </Background>
  );
};

export default QuizListSceen;

const styles = StyleSheet.create({});
