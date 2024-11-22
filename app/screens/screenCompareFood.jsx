import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ScreenCompareFood = ({  }) => {
  const [images, setImages] = useState([null, null, null]);
  const [progress, setProgress] = useState(0); // Representa la barra de progreso (0%, 33%, 66%, 100%)

  const handleImageUpload = async (index) => {
    Alert.alert('Selecciona una opción', 'Toma una foto o selecciona una imagen de la galería', [
      {
        text: 'Abrir cámara',
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled) {
            const updatedImages = [...images];
            updatedImages[index] = result.assets[0].uri;
            setImages(updatedImages);
            setProgress((updatedImages.filter((img) => img !== null).length / 3) * 100);
          }
        },
      },
      {
        text: 'Abrir galería',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled) {
            const updatedImages = [...images];
            updatedImages[index] = result.assets[0].uri;
            setImages(updatedImages);
            setProgress((updatedImages.filter((img) => img !== null).length / 3) * 100);
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  return (
    <View className="flex-1 bg-[#F5F7FA] relative px-4 py-6 pt-16">
      {/* Contenedor principal con el temporizador */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 800 }}
        className="flex items-center justify-center bg-white rounded-3xl py-16 shadow-md"
      >
        <Text className="text-black text-3xl font-bold">Comparar Alimentos</Text>
        <Text className="text-gray-500 mt-2">Sube o Fotografía Tus Alimentos</Text>
        <TouchableOpacity
          className="mt-4 bg-white w-16 h-16 rounded-full items-center justify-center shadow-md"
          onPress={() => Alert.alert('Comparar Alimentos')}
        >
          <Ionicons name="add" size={24} color="#FF5722" />
        </TouchableOpacity>
      </MotiView>

      {/* Contenedor intermedio con la barra de progreso */}
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', duration: 800, delay: 200 }}
        className="bg-white rounded-xl shadow-md py-6 px-4 mt-6"
      >
        <Text className="text-lg font-semibold text-gray-800">Fase de comparación</Text>
        <Text className="text-sm text-gray-500 mt-1">3 imágenes para completar</Text>
        <View className="bg-gray-200 h-3 rounded-full mt-4 overflow-hidden">
          <View
            style={{ width: `${progress}%` }}
            className="bg-green-500 h-full"
          />
        </View>
      </MotiView>

      {/* Contenedor inferior con los 3 slots de imágenes */}
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', duration: 800, delay: 400 }}
        className="flex-row justify-between mt-8"
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImageUpload(index)}
            className={`w-[30%] aspect-square rounded-lg shadow-md ${
              image ? 'bg-green-500' : 'bg-white'
            } items-center justify-center`}
          >
            {image ? (
              <Ionicons name="checkmark-circle" size={32} color="white" />
            ) : (
              <Ionicons name="add" size={32} color="#FF5722" />
            )}
          </TouchableOpacity>
        ))}
      </MotiView>
    </View>
  );
};

export default ScreenCompareFood;
