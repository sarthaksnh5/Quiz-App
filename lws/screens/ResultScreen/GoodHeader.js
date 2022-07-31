import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {font_Bold} from '../../constants/fonts';

const GoodHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.goodJob}>Good Job Genius!</Text>
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name="close" size={24} color={'white'} />
      </View>
    </View>
  );
};

export default GoodHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goodJob: {
    fontFamily: font_Bold,
    fontSize: 25,
    color: 'white',
  },
  iconContainer: {
    marginRight: 10,
  },
});
