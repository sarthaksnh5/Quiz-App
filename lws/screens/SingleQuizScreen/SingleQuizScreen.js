import React, {useEffect, useState} from 'react';
import {
  getAsyncData,
  storeAsycnData,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import Background from '../../component/Background';
import SnackBarComponent from '../../component/SnackBarComponent';
import {QuizConstant} from '../../constants/constants';
import BackHeader from './BackHeader';
import BannerImage from './BannerImage';
import StartQuiz from './StartQuiz';

const SingleQuizScreen = ({navigation, route}) => {
  const [userSubject, setUserSubject] = useState('');
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  useEffect(() => {
    const {subject} = route.params;
    setUserSubject(subject);
  }, []);

  return (
    <Background>
      <BackHeader
        goBack={() => {
          navigation.goBack();
        }}
      />
      <BannerImage />
      <StartQuiz
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        subject={userSubject}
        onPress={async () => {
          const {score, date} = JSON.parse(await getAsyncData(QuizConstant));
          const currentDate = new Date().getDate();
          if (date == currentDate) {
            if (score <= 3 && date == currentDate) {
              navigation.reset({
                index: 0,
                routes: [{name: 'Quiz', params: {userSubject, difficulty}}],
              });
            } else {
              setContent('Only 4 quizzes allowed per day');
              setShowSnack(true);
            }
          } else {
            await storeAsycnData(
              QuizConstant,
              JSON.stringify({score: 0, date: currentDate}),
            );
            navigation.reset({
              index: 0,
              routes: [{name: 'Quiz', params: {userSubject, difficulty}}],
            });
          }
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

export default SingleQuizScreen;
