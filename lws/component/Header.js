import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {font_Bold} from '../constants/fonts';

const Header = props => {
  return <Text style={styles.header} {...props} />;
};

export default Header;

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 12,
    fontFamily: font_Bold,
  },
});
