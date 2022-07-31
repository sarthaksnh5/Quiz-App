import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {font_Bold} from '../../constants/fonts';

const BackHeader = ({goBack}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leaderboard</Text>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 28,
    fontFamily: font_Bold,
    color: 'white',
  },
});
