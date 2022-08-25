import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {primaryColor} from '../../constants/colors';
import {LogoutBtn} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { url } from '../../constants/constants';

const UserImage = ({uri, onPress, infoScreen}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.imageBanner}>
      {uri == null ? (
            <AntDesign name="user" size={50} color={'white'} />
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
      </TouchableOpacity>
      <TouchableOpacity onPress={LogoutBtn} style={styles.logoutBtn}>
        <MaterialIcons name="logout" size={24} color={primaryColor} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={infoScreen} style={styles.infoBtn}>
        <AntDesign name="infocirlce" size={24} color={primaryColor} />
      </TouchableOpacity> */}
      
    </View>
  );
};

export default UserImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBanner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 97,
    height: 97,
    borderRadius: 50,
  },
  logoutBtn: {
    position: 'absolute',
    top: 0,
    right: 5,
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBtn: {
    position: 'absolute',
    top: 0,
    left: 5,
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
