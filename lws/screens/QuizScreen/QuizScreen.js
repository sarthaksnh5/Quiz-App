import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  getAsyncData,
  storeAsycnData,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import Background from '../../component/Background';
import FullScreenLoading from '../../component/FullScreenLoading';
import SnackBarComponent from '../../component/SnackBarComponent';
import {QuizConstant, StoreUser, url} from '../../constants/constants';
import Question from './Question';
import Timer from './Timer';

const QuizScreen = ({navigation, route}) => {
  const [start, setStart] = useState(false);
  const [selected, setSelected] = useState('0');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [skip, setSkip] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentTime, setCurrentTime] = useState(20);

  const getQuizQuestions = async () => {
    try {
      const {userSubject, difficulty} = route.params;
      const questionsURL = `${url}questions/question?category=${userSubject}&difficulty=${difficulty}`;
      const {token, email} = JSON.parse(await getAsyncData(StoreUser));
      const headers = {
        Authorization: `TOKEN ${token}`,
      };

      const resp = await fetch(questionsURL, {
        method: 'GET',
        headers: headers,
      });

      if (resp.status == 200) {
        const response = await resp.json();

        setQuestions(response);
      } else {
        setContent('Server Error! Please Try again later');
        setShowSnack(true);
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
    setStart(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      getQuizQuestions();

      return () => {
        setIsLoading(true);
      };
    }, []),
  );

  if (isLoading) {
    return <FullScreenLoading />;
  }

  const handleSubmit = async (ucorrect, uincorrect, uskip) => {
    setIsLoading(true);
    const {userSubject, difficulty} = route.params;
    const {token, email} = JSON.parse(await getAsyncData(StoreUser));
    const data = {
      user: email,
      category: userSubject,
      difficulty: difficulty,
      correct_answers: ucorrect,
      incorrect_answers: uincorrect,
      skip_answers: uskip,
      points: ucorrect,
    };
    const registerQuizUrl = `${url}questions/registerQuiz`;

    const headers = {
      Authorization: `TOKEN ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const response = await fetch(registerQuizUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    if (response.status == 201) {
      const {score, date} = JSON.parse(await getAsyncData(QuizConstant));
      storeAsycnData(
        QuizConstant,
        JSON.stringify({score: score + 1, date: date}),
      );
      navigation.navigate('Result', {answers, ucorrect, uincorrect, uskip});
    } else {
      alert('Server Error! Please try again later');
      navigation.goBack();
    }
  };

  const handleNext = async () => {
    try {
      if (questionIndex == 9) {
        setStart(false);
        var ucorrect = correct;
        var uincorrect = incorrect;
        var uskip = skip;

        if (selected == 1) {
          setAnswers([...answers, 1]);
          ucorrect += 1;
        } else if (selected == 0) {
          setAnswers([...answers, 0]);
          uincorrect += 1;
        } else {
          setAnswers([...answers, 0]);
          uskip += 1;
        }
        await handleSubmit(ucorrect, uincorrect, uskip);
      } else {
        if (selected == 1) {
          setCorrect(correct + 1);
          setAnswers([...answers, 1]);
        } else if (selected == 0) {
          setSkip(skip + 1);
          setAnswers([...answers, 0]);
        } else {
          setIncorrect(incorrect + 1);
          setAnswers([...answers, 0]);
        }
        setSelected('0');
        setQuestionIndex(questionIndex + 1);
      }
    } catch (e) {
      navigation.goBack();
      console.log(e);
    }

    setCurrentTime(20);
  };

  const handleSkip = () => {
    setQuestionIndex(questionIndex + 1);
  };

  return (
    <Background>
      <Timer
        start={start}
        setStart={setStart}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        handleNext={handleNext}
      />
      <Question
        questions={questions}
        questionIndex={questionIndex}
        selected={selected}
        setSelected={setSelected}
        onPress={handleNext}
        handleSkip={handleSkip}
      />
      <SnackBarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
      />
    </Background>
  );
};

export default QuizScreen;
