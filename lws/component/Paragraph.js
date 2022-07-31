import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {greyColor} from '../constants/colors';
import {font} from '../constants/fonts';

const Paragraph = props => {
  return <Text style={styles.header} {...props} />;
};

export default Paragraph;

const styles = StyleSheet.create({
  header: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: font,
    color: greyColor,
    marginBottom: 15,
  },
});
