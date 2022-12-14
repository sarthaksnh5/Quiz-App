import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {font_Bold} from '../../constants/fonts';
import {
  darkPink,
  greyColor,
  primaryColor,
  textColor,
} from '../../constants/colors';
import ProgressiveImage from '../../component/ProgressiveImage';
import {url} from '../../constants/constants';

const LeaderBoardList = ({usersList, leaderLoading}) => {
  return (
    <View style={styles.container}>
      {leaderLoading == true ? (
        <ActivityIndicator color={primaryColor} size={'large'} />
      ) : (
        <>
          <View style={styles.headingContainer}>
            {/* <Text style={styles.heading}>All Time</Text> */}
          </View>
          <ScrollView
            style={{width: '100%'}}
            contentContainerStyle={{width: '100%', paddingVertical: 10}}>
            {usersList.length > 0 ? (
              usersList.map((item, index) => {
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.userContainer,
                      index == 0 && {backgroundColor: primaryColor},
                    ]}>
                    <View
                      style={[
                        styles.positionContainer,
                        index == 0
                          ? {backgroundColor: primaryColor}
                          : {backgroundColor: 'white'},
                      ]}>
                      <Text
                        style={[
                          styles.position,
                          index == 0 ? {color: 'white'} : {color: greyColor},
                        ]}>
                        {index + 1}
                      </Text>
                    </View>
                    <View style={styles.imageContainer}>
                      <ProgressiveImage uri={item.user.avatar} change={index} />
                    </View>
                    <View style={styles.nameContainer}>
                      {index == 0 && <Text style={styles.genius}>LWS Genius</Text>}
                      <Text
                        style={[
                          styles.name,
                          index == 0 ? {color: 'white'} : {color: textColor},
                        ]}>
                        {item.user.first_name}
                      </Text>
                      <Text
                        style={[
                          styles.tag,
                          index == 0 ? {color: 'white'} : {color: greyColor},
                        ]}>
                        {item.points} Points
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={styles.name}>No Users Yet</Text>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default LeaderBoardList;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
  },
  headingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontFamily: font_Bold,
    fontSize: 18,
    color: textColor,
    textTransform: 'uppercase',
  },
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: darkPink,
    borderRadius: 15,
    marginTop: 10,
  },
  positionContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    fontFamily: font_Bold,
    fontSize: 15,
  },
  imageContainer: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  nameContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: font_Bold,
  },
  tag: {
    fontSize: 15,
    fontFamily: font_Bold,
  },
  genius:{
    fontFamily: font_Bold,
    fontSize: 15,
    color: 'white',
  }
});
