import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Background from '../../component/Background';
import ImageHeader from './ImageHeader';
import AboutInfo from './AboutInfo';

const AboutScreen = () => {
  return (
    <Background>
      <ImageHeader />
      <AboutInfo />
    </Background>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
