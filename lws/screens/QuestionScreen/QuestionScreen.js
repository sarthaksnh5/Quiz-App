import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../component/Background';
import QuestionHeader from './QuestionHeader';
import QuestionList from './QuestionList';
import AddQuestionBtn from './AddQuestionBtn';
import {useFocusEffect} from '@react-navigation/native';
import {
  getAsyncData,
  LogoutBtn,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {StoreUser, url} from '../../constants/constants';
import FullScreenLoading from '../../component/FullScreenLoading';

const QuestionScreen = ({navigation}) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState([]);

  const getQuestions = async () => {
    try {
      const {email, token} = JSON.parse(await getAsyncData(StoreUser));

      const hitURL = `${url}forum/question/get`;

      const headers = {
        Authorization: `TOKEN ${token}`,
      };

      const resp = await fetch(hitURL, {
        method: 'GET',
        headers: headers,
      });

      console.log(resp.status);

      if (resp.status == 200) {
        const response = await resp.json();
        setQuestions(response);
        setInitialData(response);
      } else {
        console.log(await resp.json());
      }
    } catch (e) {
      console.log(e);
      LogoutBtn();
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getQuestions();

      return () => {
        setIsLoading(true);
      };
    }, []),
  );

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <Background>
      <QuestionHeader
        initialData={initialData}
        answers={questions}
        setAnswers={setQuestions}
      />
      <QuestionList
        onPress={(id, question) => {
          navigation.navigate('AnswerQues', {id, question});
        }}
        questionList={questions}
      />
      <AddQuestionBtn
        onPress={() => {
          navigation.navigate('AddQues');
        }}
      />
    </Background>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({});
