import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  getAsyncData,
  storeAsycnData,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import Background from '../../component/Background';
import FullScreenLoading from '../../component/FullScreenLoading';
import {ImageConstant, StoreUser, url} from '../../constants/constants';
import UserDetails from './UserDetails';
import UserImage from './UserImage';

const UserScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [uri, setUri] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [userRank, setUserRank] = useState(0);
  const [imageUri, setImageUri] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [userName, setUserName] = useState('');

  const getUserInfo = async () => {
    try {
      const {token, email} = JSON.parse(await getAsyncData(StoreUser));
      const profileURL = `${url}questions/quiz?filter=quizes&email=${email}`;
      const headers = {
        Authorization: `TOKEN ${token}`,
      };

      const resp = await fetch(profileURL, {
        method: 'GET',
        headers: headers,
      });

      if (resp.status == 200) {
        const response = await resp.json();
        if (response.length > 0) {
          setQuizzes(response);

          setImageUri(response[0].user.avatar);
          setUserName(response[0].user.first_name);

          const pointsUrl = `${url}questions/quiz?filter=rank&email=${email}`;

          const rankResp = await fetch(pointsUrl, {
            method: 'GET',
            headers: headers,
          });

          if (rankResp.status == 200) {
            const rankResponse = await rankResp.json();
            setUserPoints(rankResponse.points);
            setUserRank(rankResponse.rank);
          }
        } else {
          const userUrl = `${url}user/get-details?email=${email}`;
          const userResponse = await (
            await fetch(userUrl, {
              method: 'GET',
              headers: headers,
            })
          ).json();

          setImageUri(userResponse.avatar);
          setUserName(userResponse.first_name);
        }
      } else {
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();

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
      <UserImage
        uri={
          imageUri == null
            ? 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'
            : `${url.slice(0, -1)}${imageUri}`
        }
        onPress={async () => {
          await storeAsycnData(ImageConstant, JSON.stringify({imageUri}));
          navigation.navigate('Image');
        }}
        infoScreen={() => {
          navigation.navigate('Info');
        }}
      />
      <UserDetails
        rank={userRank}
        points={userPoints}
        userName={userName}
        quiz={quizzes}
      />
    </Background>
  );
};

export default UserScreen;
