import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {url} from '../constants/constants';
import {primaryColor} from '../constants/colors';

const ProgressiveImage = ({uri, change}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {uri == null ? (
        <AntDesign
          name="user"
          size={24}
          color={change == 0 ? 'white' : primaryColor}
        />
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
                uri: `${url.slice(0, -1)}${uri}`,
              }}
              resizeMode={'cover'}
            />
          )}
        </>
      )}
    </View>
  );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '98%',
    height: '98%',
    borderRadius: 100,
  },
});
