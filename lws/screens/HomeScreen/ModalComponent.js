import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {primaryColor, textColor} from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {font, font_Bold} from '../../constants/fonts';

const ModalComponent = ({setShowModal, moveNext}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Hey Genius!</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            This is a special Quiz which will award you 10 points per question.
            Your rank will be boosted. This quiz can be played only once in a
            month. So, let's go Genius
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setShowModal(false)}>
            <AntDesign name="close" size={24} color={primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={moveNext}>
            <Entypo name="check" size={24} color={primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: '80%',
    padding: 8,
    backgroundColor: primaryColor,
    borderRadius: 25,
    alignItems: 'center',
  },
  headingContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: font_Bold,
    fontSize: 20,
    color: 'white',
  },
  textContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: font,
    fontSize: 18,
    color: 'white',
  },
  btnContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
