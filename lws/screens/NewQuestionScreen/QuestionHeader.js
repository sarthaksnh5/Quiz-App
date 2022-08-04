import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {font_Bold} from '../../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const QuestionHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <AntDesign name="arrowleft" size={24} color={'white'} />
        <Text style={styles.heading}>Add Question</Text>
      </View>
    </View>
  );
};

export default QuestionHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    marginBottom: 10,
  },
  backContainer: {
    paddingHorizontal: 8,
    width: '100%',
    marginBottom: 10,
    marginTop: 5,
    flexDirection: 'row',
  },
  heading: {
    color: 'white',
    fontFamily: font_Bold,
    fontSize: 25,
    marginLeft: 12,
  },
});
