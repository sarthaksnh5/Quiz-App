import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput as Input} from 'react-native-paper';
import {
  primaryColor,
  dangerText,
  textColor,
  greyColor,
} from '../constants/colors';
import {font} from '../constants/fonts';

const InputBox = ({
  errorText,
  description,
  secureTextEntry = false,
  isPassword = false,
  setShowPassword,
  icon,
  ...props
}) => {
  const inputIcon = () => {
    if (secureTextEntry) {
      return (
        <Input.Icon
          onPress={() => {
            setShowPassword(!isPassword);
          }}
          name={isPassword ? 'eye-off' : 'eye'}
          color={primaryColor}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        activeOutlineColor={primaryColor}
        underlineColor="transparent"
        mode="outlined"
        outlineColor={primaryColor}
        scrollEnabled={false}
        allowFontScaling={false}
        // placeholderTextColor={greyColor}
        theme={{colors: {text: textColor, placeholder: greyColor}}}
        left={
          <Input.Icon style={styles.icon} name={icon} color={primaryColor} />
        }
        right={inputIcon()}
        secureTextEntry={isPassword}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 62,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  icon: {},
  input: {
    backgroundColor: 'white',
    color: primaryColor,
    width: '100%',
    height: 62,
    fontSize: 14,
    padding: 0,
    // justifyContent: 'center',
    margin: 0,
    zIndex: 3,
    borderWidth: 0,
  },
  description: {
    fontFamily: font,
    fontSize: 13,
    color: textColor,
  },
  error: {
    fontFamily: font,
    fontSize: 13,
    color: dangerText,
  },
});
