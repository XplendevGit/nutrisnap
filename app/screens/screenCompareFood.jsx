import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { MotiView } from 'moti';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const ScreenCompareFood = () => {
  const router = useRouter();
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
    <View className="flex-1 bg-[#F5F7FA] relative px-4 py-6 pt-28">

      {/* Botón de regresar */}
      <TouchableOpacity
        onPress={() => router.push('../screens/screenMain')}
        className="absolute top-10 left-4 bg-white p-3 rounded-full shadow-md"
      >
        <MaterialIcons name="arrow-back" size={24} color="#3CC4B9" />
      </TouchableOpacity>

      {/* Contenedor principal con animación mejorada */}
      <MotiView
        from={{ opacity: 0, translateY: -50, scale: 0.9 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex items-center justify-center bg-[#3CC4B9] rounded-3xl py-16 shadow-md"
      >
        <Text className="text-white text-3xl font-bold">Comparar Productos</Text>
        <Text className="text-white/80 mt-2">Sube o Fotografía Tus Alimentos</Text>
        <TouchableOpacity
          className="mt-4 bg-white w-16 h-16 rounded-full items-center justify-center shadow-md"
          onPress={() => Alert.alert('Comparar Alimentos')}
        >
          <Ionicons name="add" size={24} color="#3CC4B9" />
        </TouchableOpacity>
      </MotiView>

      {/* Contenedor intermedio con nueva animación */}
      <MotiView
        from={{ opacity: 0, translateY: 50, scale: 0.9 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md py-6 px-4 mt-6 border-[1px] border-[#3CC4B9]"
      >
        <Text className="text-lg font-semibold text-gray-800">Fase de comparación</Text>
        {/* Actualiza el texto con el número restante de imágenes */}
        <Text className="text-sm text-gray-500 mt-1">
          {3 - images.filter((img) => img !== null).length} imágenes para completar
        </Text>
        <View className="bg-gray-200 h-3 rounded-full mt-4 overflow-hidden">
          <View
            style={{ width: `${progress}%` }}
            className="bg-[#3CC4B9] h-full"
          />
        </View>
      </MotiView>

      {/* Contenedor inferior con animación */}
      <MotiView
        from={{ opacity: 0, translateY: 50, translateX: -20 }}
        animate={{ opacity: 1, translateY: 0, translateX: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.4 }}
        className="flex-row justify-between mt-8"
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImageUpload(index)}
            className={`w-[30%] aspect-square rounded-lg shadow-md border-[1px] border-[#3CC4B9] ${
              image ? 'bg-[#3CC4B9]' : 'bg-white'
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
