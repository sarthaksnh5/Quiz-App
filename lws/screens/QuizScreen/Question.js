import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  greenText,
  greyColor,
  lightPink,
  lightPurple,
  primaryColor,
  skipColor,
  textColor,
} from '../../constants/colors';
import {font_Bold, font_ExtraBold} from '../../constants/fonts';
import {RadioButton} from 'react-native-paper';

const Question = ({
  questions,
  questionIndex,
  selected,
  setSelected,
  onPress,
  handleSkip,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.questionCountContainer}>
        <Text style={styles.questionCount}>
          Question {questionIndex + 1} of 10
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{questions[questionIndex].question}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => setSelected('1')}
          style={[
            styles.option,
            selected === '1' && styles.optionText_Selected,
          ]}>
          <View style={styles.textContainer}>
            <Text style={styles.optionText}>
              {questions[questionIndex].correct_answer}
            </Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              color={primaryColor}
              value={'1'}
              status={selected === '1' ? 'checked' : 'unchecked'}
              onPress={() => setSelected('1')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected('2')}
          style={[
            styles.option,
            selected === '2' && styles.optionText_Selected,
          ]}>
          <View style={styles.textContainer}>
            <Text style={styles.optionText}>
              {questions[questionIndex].incorrect_answer['0']}
            </Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              color={primaryColor}
              value={'2'}
              status={selected === '2' ? 'checked' : 'unchecked'}
              onPress={() => setSelected('2')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected('3')}
          style={[
            styles.option,
            selected === '3' && styles.optionText_Selected,
          ]}>
          <View style={styles.textContainer}>
            <Text style={styles.optionText}>
              {questions[questionIndex].incorrect_answer['1']}
            </Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              color={primaryColor}
              value={'3'}
              status={selected === '3' ? 'checked' : 'unchecked'}
              onPress={() => setSelected('3')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected('4')}
          style={[
            styles.option,
            selected === '4' && styles.optionText_Selected,
          ]}>
          <View style={styles.textContainer}>
            <Text style={styles.optionText}>
              {questions[questionIndex].incorrect_answer['2']}
            </Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              color={primaryColor}
              value={'4'}
              status={selected === '4' ? 'checked' : 'unchecked'}
              onPress={() => setSelected('4')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.submitskipContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.btnText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.nextButton}>
          <Text style={styles.btnText}>
            {questionIndex != 9 ? 'Next' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
  },
  questionCountContainer: {
    width: '100%',
    marginBottom: 10,
  },
  questionCount: {
    color: greyColor,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 15,
    fontFamily: font_Bold,
  },
  questionContainer: {
    width: '100%',
    marginBottom: 10,
  },
  question: {
    fontFamily: font_ExtraBold,
    fontSize: 22,
    color: textColor,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  option: {
    width: '90%',
    backgroundColor: lightPurple,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
  },
  optionText: {
    color: 'white',
    fontFamily: font_Bold,
    fontSize: 18,
  },
  optionText_Selected: {
    backgroundColor: lightPink,
  },
  submitskipContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  skipButton: {
    width: '30%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: skipColor,
    borderRadius: 15,
  },
  btnText: {
    fontFamily: font_Bold,
    textTransform: 'uppercase',
    color: 'white',
  },
  nextButton: {
    width: '30%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: greenText,
    borderRadius: 15,
  },
  textContainer: {
    width: '85%',
  },
  radioContainer: {
    width: '15%',
  },
});
