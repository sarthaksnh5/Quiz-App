import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CircularPercent from '../../component/CircularPercent';
import {darkPink, lightPink, pinkText} from '../../constants/colors';
import {font, font_Bold} from '../../constants/fonts';

const RecentQuiz = ({recentQuiz}) => {
  return (
    <View style={styles.container}>
      {recentQuiz.data == '' ? (
        <Text style={styles.noQuiz}>No Recent Quiz Yet</Text>
      ) : (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.subHeading}>RECENT QUIZ</Text>
            <Text style={styles.recentQuiz}>{recentQuiz.data.category}</Text>
          </View>
          <View style={styles.percentContainer}>
            <CircularPercent
              progress={recentQuiz.data.points / 10}
              radius={55}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default RecentQuiz;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 80,
    paddingHorizontal: 5,
    backgroundColor: lightPink,
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 10,
  },
  noQuiz: {
    fontFamily: font_Bold,
    color: 'white',
    fontSize: 18,
    padding: 5,
  },
  textContainer: {
    padding: 10,
    width: '65%',
    justifyContent: 'center',
  },
  percentContainer: {
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  subHeading: {
    color: pinkText,
    fontFamily: font,
    fontSize: 15,
    letterSpacing: 3,
  },
  recentQuiz: {
    color: darkPink,
    fontFamily: font_Bold,
    fontSize: 28,
  },
});
