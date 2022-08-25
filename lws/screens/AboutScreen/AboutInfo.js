import {ScrollView, StyleSheet, Text, View, Linking} from 'react-native';
import React from 'react';
import {font, font_Bold} from '../../constants/fonts';
import Button from '../../component/Button';
import {WebView} from 'react-native-webview';

const AboutInfo = () => {
  return (
    <ScrollView
      style={{width: '100%'}}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.aboutContainer}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.para}>
          Class 12 th student, preparing for JEE( ENGINEERING ENTERANCE EXAM )
        </Text>
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.heading}>My Journey</Text>
        <Text style={styles.para}>
          A youtuber, with a monetized youtube channel LEARN WITH SANYAM, 8K+
          subscribers, 250+ videos, provides free education, mentoring to
          school students, online platform for various National + Internation competitions
        </Text>
        <Text style={styles.para}>
          Working with around, 100 HK NGO students, provides them monthly
          scholarship program with my own pocket money.
        </Text>
        <Text style={styles.para}>
          Knows HTML, CSS, javascript, core Java, android
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <Button
            text={'Youtube'}
            mode={'outlined'}
            onPress={() => {
              Linking.openURL('https://www.youtube.com/c/LearnWithSanyam');
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            text={"Let's Chat"}
            mode={'outlined'}
            onPress={() => {
              Linking.openURL('mailto:sanyamagrawal2005@gmail.com');
            }}
          />
        </View>
      </View>
      <View style={styles.visitWebiste}>
        <Button
          text={'View More'}
          mode={'outlined'}
          onPress={() => {
            Linking.openURL('https://www.learnwithsanyam.com');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AboutInfo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    marginTop: 10,
  },
  aboutContainer: {
    width: '100%',
    padding: 5,
    marginTop: 5,
  },
  heading: {
    fontFamily: font_Bold,
    fontSize: 25,
    color: 'white',
    textTransform: 'uppercase',
  },
  para: {
    fontFamily: font,
    fontSize: 18,
    color: 'white',
  },
  btnContainer: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    width: '40%',
  },
  visitWebiste: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
