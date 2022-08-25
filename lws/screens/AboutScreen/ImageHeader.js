import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { font_Bold } from '../../constants/fonts';

const ImageHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <Text style={styles.heading}>LWS Genius Developer</Text>
      </View>
      <Image source={require('../../assets/images/profile.jpg')} style={styles.image} resizeMode={'contain'} />
    </View>
  );
};

export default ImageHeader;

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '30%',
    marginBottom: 10,
  },
  image:{
    width: '100%',
    height: '100%',
  },
  backContainer:{
    paddingHorizontal: 8,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
    alignItems: 'center'
  },
  heading:{
    color: 'white',
    fontFamily: font_Bold,
    fontSize: 25,
    marginLeft: 12,
  }
});
