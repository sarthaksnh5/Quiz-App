import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {circularFill, circularunFill} from '../constants/colors';
import {font_Bold} from '../constants/fonts';

const CircularPercent = ({
  progress = 0.65,
  radius = 40,
  width = 0,
  result = true,
  timeLeft = 0,
}) => {
  return (
    <View style={styles.container}>
      <Progress.Pie
        progress={progress}
        size={radius}
        animated={true}
        color={circularFill}
        unfilledColor={circularunFill}
        borderWidth={width}
      />
      {result ? (
        <Text style={styles.progress}>{progress * 100} %</Text>
      ) : (
        <Text style={styles.progress}>{timeLeft}</Text>
      )}
    </View>
  );
};

export default CircularPercent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    position: 'absolute',
    color: 'white',
    fontFamily: font_Bold,
    fontSize: 18,
  },
});
