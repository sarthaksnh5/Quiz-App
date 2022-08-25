import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../component/Background';
import Header from '../../component/Header';
import Subheading from '../../component/Subheading';
import {textColor} from '../../constants/colors';
import Paragraph from '../../component/Paragraph';
import InputBox from '../../component/InputBox';
import Button from '../../component/Button';
import {globalStyles} from '../../styles/Styles';
import Line from '../../component/Line';
import Dropdown from '../../component/Dropdown';
import TextArea from '../../component/TextArea';
import SnackBarComponent from '../../component/SnackBarComponent';
import {url} from '../../constants/constants';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [yourClass, setYourClass] = useState('1');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const classes = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
  ];

  const submitForm = async () => {
    if (
      username.length > 0 &&
      email.length > 0 &&
      mobile.length > 0 &&
      address.length > 0 &&
      password.length > 0 &&
      password2.length > 0
    ) {
      if (password === password2) {
        if (mobile.length === 10) {
          if (email.includes('@') && email.includes('.')) {
            setLoading(true);
            const data = {
              email: email.toLowerCase(),
              first_name: username,
              last_name: username,
              password: password,
              password2: password,
              mobile: mobile,
              types: 'Student',
              address: address,
              yourClass: '8',
            };
            const hitLink = `${url}user/register`;

            try {
              const resp = await fetch(hitLink, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

              if (resp.status === 201) {
                setContent('User Registered Successfully');
                setShowSnack(true);
                setTimeout(() => {
                  navigation.replace('Login');
                }, 1500);
              } else {

                const response = await resp.json();

                if ('email' in response) {
                  setContent(`Email: This Email ID already registered`);
                } else if ('password' in response) {
                  setContent(`Password: ${response.password[0]}`);
                } else if ('mobile' in response) {
                  setContent("Mobile Number is already registered");
                } else {
                  setContent('Server Error');
                }
                setShowSnack(true);
              }
            } catch (e) {
              console.log(e);
              setContent('Network Error please try again later');
              setShowSnack(true);
            }
            setLoading(false);
          } else {
            setContent('Email is not correct');
            setShowSnack(true);
          }
        } else {
          setContent('Mobile number is not correct');
          setShowSnack(true);
        }
      } else {
        setContent('Password are not same');
        setShowSnack(true);
      }
    } else {
      setContent('Please Fill all fields');
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
          <Subheading color={textColor}>Register Yourself!</Subheading>
          <Paragraph>
            Register Yourself and explore the world of geniuses
          </Paragraph>

          <InputBox
            label={'Name'}
            icon={'account'}
            value={username}
            onChangeText={setUsername}
          />

          <InputBox
            label={'Email'}
            icon={'mail'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email"
          />

          <InputBox
            label={'Mobile Number'}
            icon={'cellphone'}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="numeric"
          />

          <TextArea
            icon={'map-marker'}
            label={'Address'}
            value={address}
            onChangeText={setAddress}
          />

          <View style={styles.infoContainer}>
            <View style={styles.countContainer}>
              <Text>1. </Text>
              <Text>Password should not include your name</Text>
            </View>
            <View style={styles.countContainer}>
              <Text>2. </Text>
              <Text>Password should be 8 characters long</Text>
            </View>
            <View style={styles.countContainer}>
              <Text>3. </Text>
              <Text>Password should include numbers</Text>
            </View>
            <View style={styles.countContainer}>
              <Text>4. </Text>
              <Text>Password should not be too common</Text>
            </View>
          </View>

          <InputBox
            label={'Password'}
            icon={'lock'}
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            isPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <InputBox
            label={'Confirm Password'}
            icon={'lock'}
            value={password2}
            secureTextEntry={true}
            onChangeText={setPassword2}
            isPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <Button text={'Register'} isLoading={loading} onPress={submitForm} />
          <Line />
          <Button
            text={'Login'}
            mode={'outlined'}
            onPress={() => {
              navigation.replace('Login');
            }}
          />
        </View>
      </ScrollView>
      <SnackBarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
        onPress={() => setShowSnack(false)}
      />
    </Background>
  );
};

export default RegisterScreen;

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
  infoContainer: {
    width: '90%',
    padding: 5,
  },
  countContainer: {
    flexDirection: 'row',
  },
});
