import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Background from '../../component/Background';
import Header from '../../component/Header';
import Subheading from '../../component/Subheading';
import {textColor} from '../../constants/colors';
import Paragraph from '../../component/Paragraph';
import Button from '../../component/Button';
import {globalStyles} from '../../styles/Styles';
import {getAsyncData} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {StoreUser} from '../../constants/constants';

const SplashScreen = ({navigation}) => {
  const getData = async () => {
    const data = await getAsyncData(StoreUser);
    if (data != null) {
      navigation.navigate('Tab');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.styleScroll}
        contentContainerStyle={globalStyles.scrollContainer}>
        <Header color={'#fff'}>LWS</Header>
        <Subheading color={'#fff'}>Genius</Subheading>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.bottomContainer}>
          <Subheading color={textColor}>Login or Sign Up</Subheading>
          <Paragraph>
            Login or create an account to take quiz, take part in challenge and
            LWS Genius
          </Paragraph>
          <Button
            text={'LOGIN'}
            onPress={() => {
              navigation.replace('Login');
            }}
          />
          <Button
            text={'Sign Up'}
            mode={'outlined'}
            onPress={() => {
              navigation.replace('Register');
            }}
          />
        </View>
      </ScrollView>
    </Background>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  bottomContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 25,
    alignItems: 'center',
  },
});
