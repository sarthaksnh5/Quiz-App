import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  greyColor,
  lightGrey,
  primaryColor,
  secondaryColor,
  textColor,
} from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {font_Bold, font_Italic} from '../../constants/fonts';

const Quizzes = ({press}) => {
  const quiz = [
    {
      id: 1,
      title: 'Mathematics',
      tag: 'Math',
      navigate: '',
      icon: 'compass',
    },
    {
      id: 2,
      title: 'Science',
      tag: 'Science',
      navigate: '',
      icon: 'lab-flask',
    },
    {
      id: 3,
      title: 'Social Science',
      tag: 'SST',
      navigate: '',
      icon: 'map',
    },
    {
      id: 4,
      title: 'English',
      tag: 'English',
      navigate: '',
      icon: 'language',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.headingCon}>
          <Text style={styles.heading}>Quizzes</Text>
        </View>
        <View style={styles.seeall}>
          <TouchableOpacity style={styles.seeallButton}>
            <Text style={styles.seeallText}>See all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {quiz.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={press}
              style={styles.quizContainer}>
              <View style={styles.imageText}>
                <View style={styles.imageContainer}>
                  <Entypo name={item.icon} size={25} color={primaryColor} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.quizheading}>{item.title}</Text>
                  <Text style={styles.tag}>
                    {item.tag} -&gt; 3 Difficulty Levels
                  </Text>
                </View>
              </View>
              <View style={styles.nextIcon}>
                <AntDesign name="right" size={20} color={primaryColor} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Quizzes;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
  },
  headingContainer: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headingCon: {
    width: '60%',
  },
  heading: {
    color: textColor,
    fontFamily: font_Bold,
    fontSize: 28,
  },
  seeall: {
    width: '40%',
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  seeallButton: {},
  seeallText: {
    fontFamily: font_Bold,
    fontSize: 18,
    color: secondaryColor,
  },
  quizContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderColor: lightGrey,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  imageText: {
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    width: '20%',
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 5,
  },
  quizheading: {
    fontFamily: font_Bold,
    fontSize: 18,
    color: textColor,
  },
  tag: {
    fontFamily: font_Italic,
    fontSize: 12,
    color: greyColor,
  },
  scroll: {
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
  },
});
