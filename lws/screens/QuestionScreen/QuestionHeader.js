import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {font_Bold} from '../../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputBox from '../../component/InputBox';

const QuestionHeader = ({answers, setAnswers, initialData}) => {
  const handleChange = search => {
    if (search.length > 0) {
      var temp = [];
      initialData.map(item => {
        if (item.question.trim().includes(search.trim())) {
          temp.push(item);
        }
      });
      setAnswers(temp);
    } else {
      setAnswers(initialData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <Text style={styles.heading}>Questions</Text>
      </View>
      <View style={styles.searchContainer}>
        <InputBox
          label={'Search'}
          icon={'magnify'}
          onChangeText={text => handleChange(text)}
        />
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
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontFamily: font_Bold,
    fontSize: 25,
    marginLeft: 12,
  },
  searchContainer: {
    width: '90%',
    padding: 5,
    alignSelf: 'center',
  },
});
