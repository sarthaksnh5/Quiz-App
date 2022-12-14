import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CircularPercent from '../../component/CircularPercent';

const Timer = ({
  start,
  setStart,
  currentTime,
  setCurrentTime,
  questionIndex,
  setQuestionIndex,
  handleNext,
  timeout
}) => {
  useEffect(() => {
    if (start) {
      const timer =
        currentTime > 0 &&
        setInterval(() => setCurrentTime(currentTime - 1), 1000);

      if (currentTime === 0) {
        if (questionIndex != 9) {
          handleNext('0')
          setCurrentTime(timeout);
        } else {
          handleNext('0');
        }
      }
      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, start]);

  return (
    <View style={styles.container}>
      <CircularPercent
        progress={currentTime / timeout}
        radius={80}
        timeLeft={currentTime}
        result={false}
      />
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
});
