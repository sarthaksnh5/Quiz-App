import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {greyColor, primaryColor, textColor} from '../../constants/colors';
import {font, font_Bold} from '../../constants/fonts';

const AnswerList = ({answers = []}) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.byText}>By {item.user.first_name}</Text>
          <Text style={styles.dateText}>{item.on_date.split('T')[0]}</Text>
        </View>
        <View style={styles.mainContaier}>
          <Text style={styles.question}>{item.answer}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {answers.length > 0 ? (
        <FlatList
          data={answers}
          renderItem={renderItem}
          key={item => item.id}
          style={styles.listContainer}
          contentContainerStyle={styles.fullContainer}
        />
      ) : (
        <Text style={styles.noAnswer}>No Answers Yet</Text>
      )}
    </>
  );
};

export default AnswerList;

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
    marginBottom: 10,
    alignSelf: 'center',
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
