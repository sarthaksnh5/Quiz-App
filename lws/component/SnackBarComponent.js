import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Snackbar} from 'react-native-paper';

const SnackBarComponent = ({visible, setVisible, onPress, text}) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'OKAY',
          onPress: onPress,
        }}>
        {text}
      </Snackbar>
    </View>
  );
};

export default SnackBarComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
