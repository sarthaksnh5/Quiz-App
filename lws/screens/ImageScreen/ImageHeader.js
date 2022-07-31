import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const ImageHeader = ({uri}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.imageBanner}>
        <Image
          onLoadEnd={() => {
            setLoading(false);
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 1, height: 1}}
          source={{
            uri: uri,
          }}
          resizeMode={'contain'}
        />
        {loading ? (
          <ActivityIndicator color={'white'} size={'small'} />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: uri,
            }}
            resizeMode={'contain'}
          />
        )}
      </View>
    </View>
  );
};

export default ImageHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBanner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 198,
    height: 198,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
  },
});
