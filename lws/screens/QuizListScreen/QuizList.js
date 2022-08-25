import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {lightPurple, primaryColor} from '../../constants/colors';
import {font_Bold, font_Italic} from '../../constants/fonts';
import {globalStyles} from '../../styles/Styles';

const QuizList = ({onPress}) => {
  // eslint-disable-next-line no-unused-vars
  const quiz = [
    {
      id: 1,
      title: 'Maths',
      tag: 'Math',
      navigate: '',
      icon: 'compass',
      title2: 'Science',
      tag2: 'Science',
      navigate2: '',
      icon2: 'lab-flask',
    },
    {
      id: 3,
      title: 'General Knowledge',
      tag: 'General',
      navigate: '',
      icon: 'map',
      title2: 'English',
      tag2: 'English',
      navigate2: '',
      icon2: 'language',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={globalStyles.styleScroll}
        contentContainerStyle={globalStyles.scrollContainer}>
        {quiz.map(item => {
          return (
            <View key={item.id} style={styles.quizRow}>
              <TouchableOpacity onPress={() => onPress(item.tag)} style={styles.quizColumn}>
                <View style={styles.icon}>
                  <Entypo name={item.icon} color={primaryColor} size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>{item.title}</Text>
                  <Text style={styles.tag}>3 Difficulty Level</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPress(item.tag2)} style={styles.quizColumn}>
                <View style={styles.icon}>
                  <Entypo name={item.icon2} color={primaryColor} size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>{item.title2}</Text>
                  <Text style={styles.tag}>3 Difficulty Level</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default QuizList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    padding: 15,
    borderRadius: 15,
  },
  quizRow: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quizColumn: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightPurple,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontFamily: font_Bold,
    color: 'white',
    fontSize: 17,
  },
  tag: {
    fontFamily: font_Italic,
    color: 'white',
    fontSize: 15,
  },
});
