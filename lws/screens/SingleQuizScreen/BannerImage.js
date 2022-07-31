import {StyleSheet, Image, View} from 'react-native';
import React from 'react';

const BannerImage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/finding.png')}
        style={styles.image}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default BannerImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
