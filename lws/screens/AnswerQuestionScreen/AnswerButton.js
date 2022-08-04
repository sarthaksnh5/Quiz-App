import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {primaryColor} from '../../constants/colors';
import InputBox from '../../component/InputBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAsyncData} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {StoreUser, url} from '../../constants/constants';

const AnswerButton = ({questionCode}) => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (answer.length > 0) {
      setIsLoading(true);
      try {
        const {token, email} = JSON.parse(await getAsyncData(StoreUser));
        const hitURL = `${url}forum/answer/set`;

        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `TOKEN ${token}`,
        };

        const data = {
          questionCode,
          user: email,
          answer,
        };

        const resp = await fetch(hitURL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: headers,
        });

        if (resp.status == 201) {
          setAnswer('');
        } else {
          alert('Server Error!');
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <InputBox
          label={'Answer'}
          icon="account"
          value={answer}
          onChangeText={setAnswer}
        />
      </View>
      <View style={styles.sendBtn}>
        <TouchableOpacity
          style={styles.send}
          onPress={handleSend}
          disabled={isLoading}>
          {!isLoading ? (
            <Ionicons name="send" color={primaryColor} size={24} />
          ) : (
            <ActivityIndicator size={'small'} color={primaryColor} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnswerButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    width: '15%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  send: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
