import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../component/Background';
import Header from '../../component/Header';
import Subheading from '../../component/Subheading';
import {textColor} from '../../constants/colors';
import Paragraph from '../../component/Paragraph';
import InputBox from '../../component/InputBox';
import Button from '../../component/Button';
import Line from '../../component/Line';
import {globalStyles} from '../../styles/Styles';
import SnackBarComponent from '../../component/SnackBarComponent';
import {QuizConstant, StoreUser, url} from '../../constants/constants';
import {storeAsycnData} from '../../AsyncStorageHelpers/AsyncStorageHelpers';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');

  const loginBtn = async () => {
    if (username.length > 0 && password.length > 0) {
      const data = {
        username: username.toLowerCase(),
        password: password,
      };

      setLoading(true);
      const hitURL = `${url}api-token-auth`;

      try {
        const resp = await fetch(hitURL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (resp.status == 200) {
          const response = await resp.json();
          const storageData = {
            token: response.token,
            email: username,
          };
          storeAsycnData(StoreUser, JSON.stringify(storageData));
          const currentDate = new Date().getDate();
          storeAsycnData(
            QuizConstant,
            JSON.stringify({score: 0, date: currentDate}),
          );
          navigation.replace('Tab');
        } else {
          const response = await resp.json();
          if ('non_field_errors' in response) {
            setContent('Invalid Credentials! Please Try again.');
            setShowSnack(true);
          }
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    } else {
      setContent('Please Fill All Fields');
      setShowSnack(true);
    }
  };

  return (
    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.styleScroll}
        contentContainerStyle={globalStyles.scrollContainer}>
        <Header color={'#fff'}>LWS</Header>
        <Subheading color={'#fff'}>Genius</Subheading>
        <View style={styles.bottomContainer}>
          <Subheading color={textColor}>Welcome Back!</Subheading>
          <Paragraph>Let's dive into the world of genius</Paragraph>
          <InputBox
            label={'Email'}
            icon={'account'}
            value={username}
            onChangeText={setUsername}
            keyboardType="email-address"
          />
          <InputBox
            label={'Password'}
            icon={'lock'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
            isPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity>
              <Paragraph>Forgot Password?</Paragraph>
            </TouchableOpacity>
          </View>
          <Button text={'Login'} onPress={loginBtn} isLoading={loading} />
          <Line />
          <Button
            text={'Sign Up'}
            mode={'outlined'}
            onPress={() => {
              navigation.replace('Register');
            }}
          />
        </View>
      </ScrollView>
      <SnackBarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
      />
    </Background>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
  },
});
