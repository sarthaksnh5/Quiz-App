import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  getAsyncData,
  storeAsycnData,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import Background from '../../component/Background';
import FullScreenLoading from '../../component/FullScreenLoading';
import SnackBarComponent from '../../component/SnackBarComponent';
import {MonthConstant, QuizConstant, StoreUser, url} from '../../constants/constants';
import Question from './Question';
import Timer from './Timer';
import Sound from 'react-native-sound';
import buzzer from '../../assets/sounds/buzzer.mp3';
import {Animated, Easing} from 'react-native';

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
  const [special, setSpecial] = useState(false);
  const [pressed, setPressed] = useState(false);
  const timeout = 20;
  const [fadeAnim] = useState(new Animated.Value(1));

  var ding = new Sound(buzzer, null, error => {
    if (error) {
      console.log('Unable to load the buzzer sound');
      return;
    }
  });

  ding.setVolume(1);

  const getQuizQuestions = async () => {
    Sound.setCategory('Playback');

    try {
      const {userSubject, difficulty} = route.params;
      var questionsURL = '';
      if (difficulty == 'special') {
        setSpecial(true);
        questionsURL = `${url}questions/question?filter=special`;
      } else {
        setSpecial(false);
        questionsURL = `${url}questions/question?category=${userSubject}&difficulty=${difficulty}`;
      }

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
        // console.log(response);
        if (response.length > 0) setQuestions(response);
        else {
          alert('No questions in this category');
          navigation.replace('Tab');
        }
      } else {
        const response = await resp.json();
        console.log(response);
        alert('Server Error');
        navigation.replace('Tab');
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
        ding.release();
        setIsLoading(true);
      };
    }, []),
  );

  if (isLoading) {
    return <FullScreenLoading />;
  }

  const handleSubmit = async (ucorrect, uincorrect, uskip) => {
    setIsLoading(true);
    var {userSubject, difficulty} = route.params;
    const {token, email} = JSON.parse(await getAsyncData(StoreUser));
    var points;
    if (special) {
      points = parseInt(correct) * 10;
      difficulty = 'LWS Genius';
      userSubject = 'LWS Genius';
    }
    else {
      points = correct;
    }

    const data = {
      user: email,
      category: userSubject,
      difficulty: difficulty,
      correct_answers: ucorrect,
      incorrect_answers: uincorrect,
      skip_answers: uskip,
      points: points,
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
      if (special) {
        const curr = new Date().getMonth();
        var specialdata = {
          month: curr,
          count: 1,
        };
        await storeAsycnData(MonthConstant, JSON.stringify(specialdata));
      } else {
        storeAsycnData(
          QuizConstant,
          JSON.stringify({score: score + 1, date: date}),
        );
      }
      navigation.replace('Result', {answers, ucorrect, uincorrect, uskip});
    } else {
      console.log(await response.json());
      alert('Server Error! Please try again later');
      navigation.replace('Tab');
    }
  };

  const handleNext = async answer => {
    try {
      if (questionIndex == 9) {
        setStart(false);
        var ucorrect = correct;
        var uincorrect = incorrect;
        var uskip = skip;

        if (answer == questions[questionIndex].correct_answer) {
          setAnswers([...answers, 1]);
          ucorrect += 1;
        } else if (answer == 0) {
          setAnswers([...answers, 0]);
          uskip += 1;
        } else {
          setAnswers([...answers, 0]);
          uincorrect += 1;
        }
        await handleSubmit(ucorrect, uincorrect, uskip);
      } else {
        if (answer == questions[questionIndex].correct_answer) {
          setCorrect(correct + 1);
          setAnswers([...answers, 1]);
        } else if (answer == 0) {
          setSkip(skip + 1);
          setAnswers([...answers, 0]);
        } else {
          ding.play(success => {
            if (success) {
              console.log('Playing');
            } else {
              console.log('Error in playing');
            }
          });
          setIncorrect(incorrect + 1);
          setAnswers([...answers, 0]);
        }

        setSelected('0');
        // setTimeout(() => {
        //   setPressed(false);
        // }, 1000);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.back(),
          useNativeDriver: true,
        }).start(() => {
          setPressed(false);
        });
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.back(),
            useNativeDriver: true,
          }).start(setQuestionIndex(questionIndex + 1));
          setCurrentTime(timeout);
        }, 2000);
      }
    } catch (e) {
      // navigation.replace('Tab');
      console.log(e);
    }
  };

  const handleSkip = () => {
    if (questionIndex != 9) {
      // setCurrentTime(timeout);
      handleNext('0');
    } else {
      handleNext('0');
    }
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
        timeout={timeout}
        handleNext={handleNext}
      />
      <Question
        questions={questions}
        questionIndex={questionIndex}
        selected={selected}
        setSelected={setSelected}
        onPress={handleNext}
        handleSkip={handleSkip}
        pressed={pressed}
        setPressed={setPressed}
        fadeAnim={fadeAnim}
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
