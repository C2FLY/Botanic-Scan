import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const PhotoButtons = ({ onTakePhoto, onUploadPhoto }) => {
  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={onTakePhoto} />
      <Button title="Upload a Photo" onPress={onUploadPhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
});

export default PhotoButtons;
