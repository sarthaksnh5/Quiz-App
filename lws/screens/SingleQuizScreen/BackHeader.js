import {StyleSheet, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BackHeader = ({goBack}) => {
  return (
    <View style={styles.container}>
      <AntDesign onPress={goBack} name="left" color={'white'} size={24} />
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
});
