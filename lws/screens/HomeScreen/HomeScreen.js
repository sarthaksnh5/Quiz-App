import React, {useState} from 'react';
import Background from '../../component/Background';

import RecentQuiz from './RecentQuiz';
import FeatureUpdate from './FeatureUpdate';
import {Modal, ScrollView} from 'react-native';
import {globalStyles} from '../../styles/Styles';
import Quizzes from './Quizzes';
import UserHeader from './UserHeader';
import {useFocusEffect} from '@react-navigation/native';
import {
  getAsyncData,
  LogoutBtn,
  storeAsycnData,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {MonthConstant, StoreUser, url} from '../../constants/constants';
import FullScreenLoading from '../../component/FullScreenLoading';
import ModalComponent from './ModalComponent';
import SnackBarComponent from '../../component/SnackBarComponent';

const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userUri, setUserUri] = useState('');
  const [userName, setUserName] = useState('');
  const [recentQuiz, setRecentQuiz] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');

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

        setUserUri(response.avatar);
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
      }else{
        alert('Server Error')
        LogoutBtn()
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

  const moveNext = async () => {
    try {
      const curr = new Date().getMonth();
      const montCon = JSON.parse(await getAsyncData(MonthConstant));
      if (montCon != null) {
        var {count} = montCon;
        if (count > 0) {
          setContent('More than 1 quiz in a month not allowed');
          setShowSnack(true);
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {name: 'Quiz', params: {userSubject: '', difficulty: 'special'}},
          ],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Background>
      <UserHeader uri={userUri} username={userName} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.styleScroll}
        contentContainerStyle={globalStyles.scrollContainer}>
        <RecentQuiz recentQuiz={recentQuiz} />
        <FeatureUpdate
          onPress={() => {
            setShowModal(true);
          }}
        />
        <Quizzes
          press={() => {
            navigation.navigate('QuizList');
          }}
        />
      </ScrollView>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <ModalComponent setShowModal={setShowModal} moveNext={moveNext} />
      </Modal>
      <SnackBarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
      />
    </Background>
  );
};

export default HomeScreen;
