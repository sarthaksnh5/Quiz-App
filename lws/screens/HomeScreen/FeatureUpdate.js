import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {lightPurple, secondaryColor} from '../../constants/colors';
import IconButton from '../../component/IconButton';
import {font_Bold} from '../../constants/fonts';

const FeatureUpdate = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Featured</Text>
      </View>
      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraph}>
          Take part in challenges to win LWS Genius Title
        </Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <IconButton text={'Take Part'} icon="" mode="outlined" />
      </TouchableOpacity>
    </View>
  );
};

export default FeatureUpdate;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: lightPurple,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  headingContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  heading: {
    color: secondaryColor,
    fontFamily: font_Bold,
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 5,
  },
  paragraphContainer: {
    width: '70%',
  },
  paragraph: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: font_Bold,
    fontSize: 22,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    width: '50%',
  },
});
