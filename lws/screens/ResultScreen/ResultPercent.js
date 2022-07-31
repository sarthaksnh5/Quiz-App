import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CircularPercent from '../../component/CircularPercent';

const ResultPercent = ({percentage}) => {
  return (
    <View style={styles.container}>
      <CircularPercent progress={percentage} radius={150} />
    </View>
  );
};

export default ResultPercent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
