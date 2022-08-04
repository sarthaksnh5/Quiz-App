import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {greyColor, primaryColor, textColor} from '../../constants/colors';
import {font, font_Bold} from '../../constants/fonts';

const QuestionList = ({onPress, questionList = []}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(item.questionCode, item.question)}>
        <View style={styles.topContainer}>
          <Text style={styles.byText}>
            By {item.anonymous ? 'Anonymous' : item.user.first_name}
          </Text>
          <Text style={styles.dateText}>{item.on_date}</Text>
        </View>
        <View style={styles.mainContaier}>
          <Text style={styles.question}>{item.question}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {questionList.length > 0 ? (
        <FlatList
          data={questionList}
          renderItem={renderItem}
          key={item => item.id}
          style={styles.listContainer}
          contentContainerStyle={styles.fullContainer}
        />
      ) : (
        <Text style={styles.noAnswer}>No Question</Text>
      )}
    </>
  );
};

export default QuestionList;

const styles = StyleSheet.create({
  fullContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  listContainer: {
    width: '100%',
  },
  container: {
    width: '90%',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  byText: {
    fontSize: 18,
    color: greyColor,
    fontFamily: font,
  },
  dateText: {
    fontSize: 18,
    color: greyColor,
    fontFamily: font,
  },
  mainContaier: {
    width: '100%',
  },
  question: {
    fontSize: 18,
    color: textColor,
    fontFamily: font_Bold,
  },
  noAnswer: {
    color: 'white',
    fontFamily: font,
    fontSize: 22,
  },
});
