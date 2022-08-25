/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  greyColor,
  lightGrey,
  primaryColor,
  textColor,
} from '../../constants/colors';
import {font_Bold, font_ExtraBold} from '../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import CircularPercent from '../../component/CircularPercent';

const UserDetails = ({rank, points, userName, quiz = []}) => {  

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{userName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.columnContainer}>
          <AntDesign name="staro" color={'white'} size={34} />
          <Text style={styles.tag}>Points</Text>
          <Text style={styles.values}>{points}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.columnContainer}>
          <Fontisto name="world" color={'white'} size={34} />
          <Text style={styles.tag}>World Rank</Text>
          <Text style={styles.values}>#{rank}</Text>
        </View>
      </View>
      <Text style={styles.recent}>Recent Quizes</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        contentContainerStyle={{width: '100%'}}>
        {quiz.length > 0 ? (
          quiz.map(item => {
            
            var icon = '';
            if (item.category == 'Science' || item.category == 'LWS Genius') {
              icon = 'lab-flask';
            }
            if (item.category == 'General') {
              icon = 'map';
            }
            if (item.category == 'Math') {
              icon = 'compass';
            }
            if (item.category == 'English') {
              icon = 'language';
            }

            return (
              <View key={item.id} style={styles.quizDetails}>
                <View style={styles.iconContaier}>
                  <Entypo name={icon} color={primaryColor} size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.quizheading}>{item.category}</Text>
                  <Text style={styles.subHeading}>{item.difficulty}</Text>
                </View>
                <View style={styles.scores}>
                  <CircularPercent progress={item.points > 10 ? item.points / 100 : item.points / 10} radius={50} />
                </View>
              </View>
            );
          })
        ) : (
          <Text>No Quizzes Yet</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    zIndex: -1,
    marginTop: '-14%',
    height: '80%',
  },
  headingContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  heading: {
    fontSize: 25,
    fontFamily: font_ExtraBold,
    color: textColor,
  },
  detailsContainer: {
    backgroundColor: primaryColor,
    borderRadius: 15,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  line: {
    width: 2,
    height: '90%',
    backgroundColor: 'white',
  },
  columnContainer: {
    width: '50%',
    alignItems: 'center',
  },
  tag: {
    color: lightGrey,
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: font_Bold,
  },
  values: {
    color: 'white',
    fontSize: 22,
    textTransform: 'uppercase',
    fontFamily: font_Bold,
  },
  quizDetails: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    height: 50,
    alignItems: 'center',
  },
  iconContaier: {
    width: '20%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '50%',
    alignItems: 'flex-start',
  },
  quizheading: {
    fontFamily: font_Bold,
    fontSize: 18,
    color: textColor,
  },
  subHeading: {
    fontFamily: font_Bold,
    fontSize: 12,
    color: greyColor,
    textTransform: 'uppercase',
  },
  scores: {
    width: '30%',
    alignItems: 'flex-end',
  },
  recent: {
    fontFamily: font_ExtraBold,
    fontSize: 22,
    color: textColor,
    marginTop: 10,
  },
});
