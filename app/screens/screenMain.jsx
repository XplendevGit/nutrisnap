import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import LottieView from 'lottie-react-native';
import * as ImagePicker from 'expo-image-picker';
import BottomNavBar from './BottomNavBar';
import { useRouter } from 'expo-router'; // Asegúrate de tener expo-router instalado y configurado

const ScreenMain = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [containerImages, setContainerImages] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
  });

  const handleImageUpload = async (containerIndex) => {
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
            setContainerImages((prev) => ({
              ...prev,
              [containerIndex]: result.assets[0].uri,
            }));
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
            setContainerImages((prev) => ({
              ...prev,
              [containerIndex]: result.assets[0].uri,
            }));
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleNavigateToCompareFood = () => {
    router.push('../screens/screenCompareFood'); // Ruta de ScreenCompareFood
  };

  return (
    <View className="flex-1 bg-[#F5F7FA] relative">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1">
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'spring', duration: 800, damping: 15 }}
          className="px-4 pt-12"
        >
          {/* Título y buscador */}
          <Text className="text-lg text-gray-800 font-semibold">Hora de Snap!</Text>
          <Text className="text-2xl font-bold text-gray-900 mt-2">¿Qué Alimento Buscas?</Text>
          <View className="flex-row items-center mt-4 bg-white rounded-lg shadow-md p-4">
            <Ionicons name="search" size={20} color="#388E3C" />
            <TextInput
              placeholder="Pan Integral Pierre..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              className="flex-1 ml-2 text-gray-700"
            />
            <TouchableOpacity onPress={() => Alert.alert('Search', `Searching for: ${searchTerm}`)}>
              <Ionicons name="send" size={20} color="#388E3C" />
            </TouchableOpacity>
          </View>

          {/* Contenedores de productos */}
          <View className="mt-8">
            <View className="flex flex-wrap flex-row justify-between">
              {/* Primer contenedor redirige a ScreenCompareFood */}
              <TouchableOpacity
                onPress={handleNavigateToCompareFood}
                className="w-[48%] aspect-square bg-white rounded-lg shadow-md p-4 mb-4"
                style={{ backgroundColor: '#4CAF50' }}
              >
                {containerImages[0] ? (
                  <Image
                    source={{ uri: containerImages[0] }}
                    className="absolute inset-0 w-full h-full rounded-lg"
                    style={{ resizeMode: 'cover' }}
                  />
                ) : (
                  <View className="flex-1 justify-between">
                    <Text className="text-white font-bold text-lg">Sube un Snap</Text>
                    <Text className="text-white mt-2">0 Productos</Text>
                    <Ionicons
                      name="camera"
                      size={32}
                      color="white"
                      className="absolute bottom-4 right-4"
                    />
                  </View>
                )}
              </TouchableOpacity>

              {/* Otros contenedores mantienen la funcionalidad original */}
              {[1, 2, 3].map((index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImageUpload(index)}
                  className="w-[48%] aspect-square bg-white rounded-lg shadow-md p-4 mb-4"
                  style={{ backgroundColor: ['#FF5722', '#FFC107', '#3F51B5'][index - 1] }}
                >
                  {containerImages[index] ? (
                    <Image
                      source={{ uri: containerImages[index] }}
                      className="absolute inset-0 w-full h-full rounded-lg"
                      style={{ resizeMode: 'cover' }}
                    />
                  ) : (
                    <View className="flex-1 justify-between">
                      <Text className="text-white font-bold text-lg">Sube un Snap</Text>
                      <Text className="text-white mt-2">0 Productos</Text>
                      <Ionicons
                        name="camera"
                        size={32}
                        color="white"
                        className="absolute bottom-4 right-4"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botón animado */}
          <View className="mt-4 items-center">
            <TouchableOpacity onPress={() => Alert.alert('Action', 'Performing additional action!')} className="w-20 h-20">
              <LottieView
                source={require('../../assets/images/dados_animation_lottie.json')} // Ubicación del archivo local Lottie
                autoPlay
                loop
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            </TouchableOpacity>
          </View>
        </MotiView>
      </ScrollView>

      {/* Footer NavBar */}
      <BottomNavBar />
    </View>
  );
};

export default ScreenMain;
