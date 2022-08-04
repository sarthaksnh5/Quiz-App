import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../component/Background';
import QuestionHeader from './QuestionHeader';
import AddQuestion from './AddQuestion';
import SnackBarComponent from '../../component/SnackBarComponent';

const NewQuestionScreen = ({navigation}) => {
  const [content, setContent] = useState('');
  const [showSnack, setShowSnack] = useState(false);

  return (
    <Background>
      <QuestionHeader />
      <AddQuestion
        setContent={setContent}
        setShowSnack={setShowSnack}
        goBack={() => {
          navigation.goBack();
        }}
      />
      <SnackBarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
      />
    </Background>
  );
};

export default NewQuestionScreen;

const styles = StyleSheet.create({});
