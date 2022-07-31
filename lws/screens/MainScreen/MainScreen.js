import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

const MainScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Splash');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/sanyam.jpg')}
        style={styles.image}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1929',
  },
  image: {
    width: '100%',
    height: 400,
  },
});
