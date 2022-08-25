import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {primaryColor} from '../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {font_Bold} from '../constants/fonts';

const IconButton = ({mode = 'primary', text, icon}) => {
  return (
    <View
      style={[styles.container, styles[`container_${mode}`]]}>
      <Entypo name="trophy" color={primaryColor} size={24} />
      <Text style={[styles.text, styles[`text_${mode}`]]}>{text}</Text>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    marginVertical: 12,
    borderRadius: 5,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  container_primary: {
    backgroundColor: primaryColor,
  },
  container_outlined: {
    backgroundColor: 'white',
    borderColor: primaryColor,
    borderWidth: 1.5,
  },
  text: {
    fontFamily: font_Bold,
    fontSize: 18,
    textTransform: 'uppercase',
  },
  text_primary: {
    color: 'white',
  },
  text_outlined: {
    color: primaryColor,
  },
});
