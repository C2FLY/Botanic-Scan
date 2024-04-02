import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InstructionCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>Instructions: Upload a photo or take a photo using the camera.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  cardText: {
    textAlign: 'center',
  },
});

export default InstructionCard;
