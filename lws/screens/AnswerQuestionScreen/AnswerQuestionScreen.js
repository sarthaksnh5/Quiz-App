import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../component/Background';
import QuestionHeader from './QuestionHeader';
import AnswerList from './AnswerList';
import AnswerButton from './AnswerButton';
import {useFocusEffect} from '@react-navigation/native';
import FullScreenLoading from '../../component/FullScreenLoading';
import {getAsyncData} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {StoreUser, url} from '../../constants/constants';

const AnswerQuestionScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [questionCode, setQuestionCode] = useState('');

  const getAnswers = async () => {
    try {
      const {id, question} = route.params;
      const {email, token} = JSON.parse(await getAsyncData(StoreUser));
      const hitURL = `${url}forum/answer/get?code=${id}`;
      setQuestionCode(id);
      const headers = {
        Authorization: `TOKEN ${token}`,
      };
      setUserQuestion(question);

      const resp = await fetch(hitURL, {
        method: 'GET',
        headers: headers,
      });

      if (resp.status == 200) {
        const response = await resp.json();
        setAnswers(response);
      }
    } catch (e) {
      console.log(e);
      navigation.goBack();
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAnswers();

      const getTimeout = setInterval(() => {
        getAnswers();
      }, 2000);

      return () => {
        clearInterval(getTimeout);
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
        question={userQuestion}
        goBack={() => navigation.goBack()}
      />
      <AnswerList answers={answers} />
      <AnswerButton questionCode={questionCode} />
    </Background>
  );
};

export default AnswerQuestionScreen;

const styles = StyleSheet.create({});
