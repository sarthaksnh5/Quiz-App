import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Dropdown from '../../component/Dropdown';

const DifficultyFilter = ({
  difficulty,
  setDifficulty,
  labels,
  subject,
  subjects,
  setSubject,
}) => {
  return (
    <View style={styles.container}>
      <Dropdown inputs={labels} value={difficulty} setValue={setDifficulty} />
      <Dropdown inputs={subjects} value={subject} setValue={setSubject} />
    </View>
  );
};

export default DifficultyFilter;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
