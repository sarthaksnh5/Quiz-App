import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {lightPurple, primaryColor} from '../../constants/colors';
import {font_Bold, font_ExtraBold} from '../../constants/fonts';
import {url} from '../../constants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UserHeader = ({username, uri}) => {
  const [loading, setLoading] = useState(true);
  
  const getIcon = () => {
    const date = new Date();
    var icon = 'sun';
    var greet = 'Good Morning';

    if (date.getHours() < 12) {
      icon = 'sun';
      greet = 'Good Morning';
    } else if (date.getHours() < 18) {
      icon = 'sun';
      greet = 'Good Afternoon';
    } else {
      icon = 'moon';
      greet = 'Good Evening';
    }
    return [icon, greet];
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.iconContainer}>
          <Feather name={getIcon()[0]} color={lightPurple} size={24} />
          <Text style={styles.text}>{getIcon()[1]}</Text>
        </View>
        <Text style={styles.userText}>{username}</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.imageBanner}>
          {uri == null ? (
            <AntDesign name="user" size={24} color={'white'} />
          ) : (
            <>
              <Image
                onLoadEnd={() => {
                  setLoading(false);
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{width: 1, height: 1}}
                source={{
                  uri: `${url.slice(0, -1)}${uri}`,
                }}
                resizeMode={'contain'}
              />
              {loading ? (
                <ActivityIndicator color={'white'} size={'small'} />
              ) : (
                <Image
                  style={styles.image}
                  source={{
                    uri: `${url.slice(0, -1)}${uri}`
                  }}
                  resizeMode={'cover'}
                />
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '90%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginBottom: 10,
    elevation: 5,
  },
  textContainer: {
    width: '60%',
  },
  imageContainer: {
    width: '40%',
    alignItems: 'flex-end',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    marginHorizontal: 10,
    color: lightPurple,
    fontSize: 15,
    fontFamily: font_Bold,
  },
  userText: {
    color: 'white',
    fontSize: 25,
    fontFamily: font_ExtraBold,
  },
  imageBanner: {
    width: 55,
    height: 55,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 40,
  },
});
