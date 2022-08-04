import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {primaryColor} from '../../constants/colors';

const AddQuestionBtn = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AntDesign name="pluscircleo" color={primaryColor} size={24} />
    </TouchableOpacity>
  );
};

export default AddQuestionBtn;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
