import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Title from './components/Title';
import InstructionCard from './components/InstructionCard';
import PhotoButtons from './components/PhotoButtons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [prediction, setPrediction] = useState(null);

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const takenPhoto = result.assets[0].uri;
        navigation.navigate('Second', { selectedImage: takenPhoto, prediction: await uploadImage(takenPhoto) });
      }
    } catch (error) {
      console.error('Error taking a photo', error);
    }
  };

  const handleUploadPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0].uri;
        navigation.navigate('Second', { selectedImage, prediction: await uploadImage(selectedImage) });
      }
    } catch (error) {
      console.error('Error picking an image', error);
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', { uri: imageUri, name: 'photo.jpg', type: 'image/jpg' });

      const response = await axios.post('https://9966-2a01-4b00-ad22-bd00-d8f5-4d61-88ef-394b.ngrok-free.app/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Prediction result:', response.data);

      return response.data; 
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Title />
      <InstructionCard />
      <PhotoButtons onTakePhoto={handleTakePhoto} onUploadPhoto={handleUploadPhoto} />
    </View>
  );
};

const SecondScreen = ({ route }) => {
  const { selectedImage, prediction } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulatePrediction = async () => {

      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    simulatePrediction();
  }, []); 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Second Screen</Text>

      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}

      {loading && <Text>Predicting...</Text>}

      {!loading && prediction && (
        <View style={{ marginTop: 20 }}>
          <Text>Predicted Class: {prediction.predicted_class}</Text>
          <Text>Probability: {prediction.probability}</Text>
        </View>
      )}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
