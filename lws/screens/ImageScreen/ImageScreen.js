import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Background from '../../component/Background';
import Button from '../../component/Button';
import ImageHeader from './ImageHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import {getAsyncData} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {ImageConstant, StoreUser, url} from '../../constants/constants';
import SnackBarComponent from '../../component/SnackBarComponent';

const ImageScreen = ({navigation, route}) => {
  const [imageURI, setImageURI] = useState({name: '', uri: '', type: ''});
  const [upload, setUpload] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');

  const handleImagePicker = async () => {
    const {token, email} = JSON.parse(await getAsyncData(StoreUser));

    if (upload) {
      setImageLoading(true);
      try {
        let fd = new FormData();
        fd.append('email', email);
        fd.append('avatar', imageURI);

        const userURL = `${url}user/register`;

        const resp = await fetch(userURL, {
          method: 'PUT',
          body: fd,
        });

        if (resp.status == 200) {
          setContent('Image Uploaded');
          setShowSnack(true);
          setTimeout(() => {
            navigation.goBack();
          }, 1500);
        } else {
          setContent('Server Error!');
          setShowSnack(true);
        }
      } catch (e) {
        console.log(e);
      }
      setImageLoading(false);
    } else {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (!result.didCancel) {
        setImageURI({
          name: `${email.split(' ')[0]}.jpg`,
          uri: result.assets[0].uri,
          type: result.assets[0].type,
        });
        setUpload(true);
      }
    }
  };

  const getUserData = async () => {
    const {imageUri} = JSON.parse(await getAsyncData(ImageConstant));
    setImageURI({name: '', uri: imageUri, type: ''});
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, []),
  );

  return (
    <Background>
      <ImageHeader
        uri={
          imageURI.uri == null
            ? 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'
            : `${url.slice(0, -1)}${imageURI.uri}`
        }
      />
      <View style={{width: '80%'}}>
        <Button
          text={upload ? 'Select Image' : 'Upload'}
          isLoading={imageLoading}
          mode={'outlined'}
          onPress={handleImagePicker}
        />
      </View>
      <SnackBarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
      />
    </Background>
  );
};

export default ImageScreen;
