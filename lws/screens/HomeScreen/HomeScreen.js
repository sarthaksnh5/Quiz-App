import React, {useState} from 'react';
import Background from '../../component/Background';

import RecentQuiz from './RecentQuiz';
import FeatureUpdate from './FeatureUpdate';
import {ScrollView} from 'react-native';
import {globalStyles} from '../../styles/Styles';
import Quizzes from './Quizzes';
import UserHeader from './UserHeader';
import {useFocusEffect} from '@react-navigation/native';
import {
  getAsyncData,
  LogoutBtn,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {StoreUser, url} from '../../constants/constants';
import FullScreenLoading from '../../component/FullScreenLoading';
import SnackBarComponent from '../../component/SnackBarComponent';

const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userUri, setUserUri] = useState('');
  const [userName, setUserName] = useState('');
  const [recentQuiz, setRecentQuiz] = useState({});

  const getUserData = async () => {
    try {
      const {email, token} = JSON.parse(await getAsyncData(StoreUser));
      const appURL = `${url}user/get-details?email=${email}`;

      const headers = {
        Authorization: `TOKEN ${token}`,
      };

      const resp = await fetch(appURL, {
        method: 'GET',
        headers: headers,
      });

      if (resp.status == 200) {
        const response = await resp.json();

        setUserUri(`${url.slice(0, -1)}${response.avatar}`);
        setUserName(response.first_name);

        const quizURL = `${url}questions/quiz?email=${email}&filter=user`;

        const quizResp = await fetch(quizURL, {
          method: 'GET',
          headers: headers,
        });

        if (quizResp.status == 200) {
          const quizResponse = await quizResp.json();
          setRecentQuiz({data: quizResponse});
        } else {
          setRecentQuiz({data: false});
        }
      }
    } catch (e) {
      console.log(e);
      alert('Error');
      LogoutBtn();
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();

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
      <UserHeader uri={userUri} username={userName} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.styleScroll}
        contentContainerStyle={globalStyles.scrollContainer}>
        <RecentQuiz recentQuiz={recentQuiz} />
        <FeatureUpdate />
        <Quizzes
          press={() => {
            navigation.navigate('QuizList');
          }}
        />
      </ScrollView>
      <SnackBarComponent />
    </Background>
  );
};

export default HomeScreen;
