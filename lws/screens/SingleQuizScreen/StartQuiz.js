import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  darkPink,
  greyColor,
  lightGrey,
  lightPink,
  primaryColor,
  textColor,
} from '../../constants/colors';
import {font, font_Bold, font_ExtraBold} from '../../constants/fonts';
import Button from '../../component/Button';
import Dropdown from '../../component/Dropdown';

const StartQuiz = ({onPress, subject, difficulty, setDifficulty}) => {
  const inputs = [
    {label: 'Easy', value: 'Easy'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Hard', value: 'Hard'},
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={globalStyles.styleScroll}>
      <View style={styles.headingContainer}>
        <Text style={styles.tag}>{subject}</Text>
        <Text style={styles.heading}>Basic {subject} Test</Text>
      </View>
      <View style={styles.detialContainer}>
        <View style={styles.questionContainer}>
          <View style={styles.iconContainer}>
            <AntDesign name="questioncircle" size={24} color={primaryColor} />
          </View>
          <View style={styles.questions}>
            <Text style={styles.questionText}>10 Questions</Text>
          </View>
        </View>
        <View style={styles.veticalLine} />
        <View style={styles.questionContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="puzzle-piece" size={24} color={primaryColor} />
          </View>
          <View style={styles.questions}>
            <Text style={styles.questionText}>10 Points</Text>
          </View>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeading}>Description</Text>
        <Text style={styles.description}>
          Anytime is a good time for quiz and even better if that happens of
          your favorite subject
        </Text>
        <Text>Select difficulty</Text>
        <Dropdown inputs={inputs} value={difficulty} setValue={setDifficulty} />
      </View>
      <View style={styles.creatorContainer}>
        <View style={styles.userIcon}>
          <FontAwesome name="user-circle-o" color={primaryColor} size={35} />
        </View>
        <View style={styles.creator}>
          <Text style={styles.creatorname}>Sanyam</Text>
          <Text style={styles.creatorTag}>Creator</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} text={'Take Quiz'} />
      </View>
    </ScrollView>
  );
};

export default StartQuiz;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  headingContainer: {
    width: '100%',
    padding: 5,
  },
  tag: {
    fontFamily: font_Bold,
    color: lightGrey,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  heading: {
    fontFamily: font_ExtraBold,
    color: textColor,
    fontSize: 22,
  },
  detialContainer: {
    padding: 10,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: lightPink,
    borderRadius: 15,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  questionContainer: {
    width: '40%',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: '25%',
    marginRight: 3,
  },
  questions: {
    width: '75%',
  },
  questionText: {
    fontFamily: font_Bold,
    color: textColor,
    fontSize: 15,
    textAlign: 'center',
  },
  veticalLine: {
    height: '100%',
    backgroundColor: darkPink,
    width: 2,
  },
  descriptionContainer: {
    width: '100%',
    padding: 5,
  },
  descriptionHeading: {
    textTransform: 'uppercase',
    fontFamily: font_Bold,
    color: lightGrey,
    fontSize: 18,
  },
  description: {
    fontFamily: font,
    fontSize: 15,
    color: textColor,
    marginVertical: 5,
  },
  creatorContainer: {
    width: '100%',
    marginTop: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 10,
  },
  creator: {},
  creatorname: {
    fontFamily: font_Bold,
    fontSize: 18,
    color: textColor,
  },
  creatorTag: {
    fontFamily: font_Bold,
    fontSize: 15,
    color: greyColor,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    width: '100%',
    padding: 5,
  },
});
