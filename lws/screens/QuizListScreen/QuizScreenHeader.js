import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {font_Bold} from '../../constants/fonts';

const QuizScreenHeader = ({goBack}) => {
  return (
    <View style={styles.container}>
      <AntDesign onPress={goBack} name="left" color={'white'} size={24} />
      <Text style={styles.heading}>Choose Category</Text>
    </View>
  );
};

export default QuizScreenHeader;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  heading: {
    fontFamily: font_Bold,
    color: 'white',
    fontSize: 25,
    marginLeft: 10,
  },
});
