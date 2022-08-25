import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  dangerText,
  greenText,
  greyColor,
  lightPurple,
  skipColor,
  textColor,
} from '../../constants/colors';
import {font_Bold, font_ExtraBold} from '../../constants/fonts';

const Question = ({
  questions,
  questionIndex,
  selected,
  setSelected,
  onPress,
  handleSkip,
  pressed,
  setPressed,
  fadeAnim,
}) => {
  const [answersList, setAnswersList] = useState([]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(item.answer);
          setPressed(true);
          onPress(item.answer);
        }}
        disabled={pressed}
        style={[
          styles.option,
          item.correct == 0 && pressed && styles.incorrect_answer,
          item.correct == 1 && pressed && styles.correct_answer,
        ]}>
        <View style={styles.textContainer}>
          <Text style={styles.optionText}>{item.answer}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    var randomOption = Math.floor(Math.random() * 3) + 0;
    var pos = 0;
    var temp = [];

    for (var i = 0; i < 4; i++) {
      if (i == randomOption) {
        temp.push({
          id: i,
          answer: questions[questionIndex].correct_answer,
          correct: 1,
        });
      } else {
        temp.push({
          id: i,
          answer: questions[questionIndex].incorrect_answer[pos],
          correct: 0,
        });
        pos = pos + 1;
      }
    }
    setAnswersList(temp);
  }, [questionIndex]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{width: '100%'}}>
      <Animated.View style={{opacity: fadeAnim}}>
        <View style={styles.questionCountContainer}>
          <Text style={styles.questionCount}>
            Question {questionIndex + 1} of 10
          </Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {questions[questionIndex].question}
          </Text>
        </View>
        {/* <View style={styles.optionsContainer}> */}
        <FlatList
          data={answersList}
          renderItem={renderItem}
          key={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.optionsContainer}
        />
        {/* </View> */}
        <View style={styles.submitskipContainer}>
          {questionIndex != 9 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.btnText}>Skip</Text>
            </TouchableOpacity>
          )}
          {questionIndex == 9 && (
            <TouchableOpacity onPress={onPress} style={styles.nextButton}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </ScrollView>
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
    textTransform: 'capitalize',
  },
  correct_answer: {
    backgroundColor: greenText,
  },
  incorrect_answer: {
    backgroundColor: dangerText,
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
    width: '100%',
  },
});
