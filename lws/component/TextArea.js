import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput as Input} from 'react-native-paper';
import {primaryColor, dangerText, textColor, greyColor} from '../constants/colors';

const TextArea = ({
  errorText,
  description,
  secureTextEntry = false,
  isPassword = false,
  setShowPassword,
  icon,
  ...props
}) => {
  const inputIcon = () => {
    if (isPassword) {
      return (
        <Input.Icon
          onPress={() => {
            setShowPassword(!secureTextEntry);
          }}
          name={secureTextEntry ? 'eye-off' : 'eye'}
          color={primaryColor}
          outlineColor={primaryColor}
          // placeholderTextColor={greyColor}
          theme={{colors: {text: textColor, placeholder: greyColor}}}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Input
        multiline
        numberOfLines={3}
        style={styles.input}
        activeOutlineColor={primaryColor}
        underlineColor="transparent"
        mode="outlined"
        outlineColor={primaryColor}
        scrollEnabled={false}
        // placeholderTextColor={greyColor}
        theme={{colors: {text: textColor, placeholder: greyColor}}}
        left={
          <Input.Icon style={styles.icon} name={icon} color={primaryColor} />
        }
        right={inputIcon()}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    alignItems: 'flex-start',
    marginBottom: 25,
    padding: 10,
  },
  icon: {},
  input: {
    backgroundColor: 'white',
    color: primaryColor,
    width: '100%',
    height: 100,
    fontSize: 14,
    lineHeight: 14,
    padding: 0,
  },
  description: {
    fontSize: 13,
    color: textColor,
  },
  error: {
    fontSize: 13,
    color: dangerText,
  },
});
