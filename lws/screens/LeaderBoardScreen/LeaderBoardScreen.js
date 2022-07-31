import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {getAsyncData} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import Background from '../../component/Background';
import FullScreenLoading from '../../component/FullScreenLoading';
import SnackBarComponent from '../../component/SnackBarComponent';
import {StoreUser, url} from '../../constants/constants';
import BackHeader from './BackHeader';
import DifficultyFilter from './DifficultyFilter';
import LeaderBoardList from './LeaderBoardList';

const LeaderBoardScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaders, setLeaders] = useState([]);
  const [currentDifficulty, setCurrentDifficulty] = useState('Easy');
  const [currentCategory, setCurrentCategory] = useState('Science');
  const labels = [
    {label: 'Easy', value: 'Easy'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Hard', value: 'Hard'},
  ];
  const cateogry = [
    {label: 'Science', value: 'Science'},
    {label: 'Social Science', value: 'Social'},
    {label: 'Mathematics', value: 'Math'},
    {label: 'English', value: 'English'},
  ];

  const [leadersLoading, setLeadersLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');

  const getLeaderboard = async () => {
    setLeadersLoading(true);
    try {
      const {token, email} = JSON.parse(await getAsyncData(StoreUser));
      const leaderBoardURL = `${url}questions/leaderboard?category=${currentCategory}&difficulty=${currentDifficulty}`;

      const headers = {
        Authorization: `TOKEN ${token}`,
      };

      const resp = await fetch(leaderBoardURL, {
        method: 'GET',
        headers: headers,
      });

      if (resp.status == 200) {
        const response = await resp.json();
        setLeaders(response);
      } else {
        setContent('Server Error!');
        setShowSnack(true);
      }
    } catch (e) {
      console.log(e);
    }
    setLeadersLoading(false);
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getLeaderboard();

      return () => {
        setIsLoading(true);
      };
    }, []),
  );

  useEffect(() => {
    getLeaderboard();
  }, [currentCategory, currentDifficulty]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <Background>
      <BackHeader />
      <DifficultyFilter
        labels={labels}
        difficulty={currentDifficulty}
        setDifficulty={setCurrentDifficulty}
        subjects={cateogry}
        subject={currentCategory}
        setSubject={setCurrentCategory}
      />
      <LeaderBoardList usersList={leaders} leaderLoading={leadersLoading} />
      <SnackBarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
      />
    </Background>
  );
};

export default LeaderBoardScreen;
