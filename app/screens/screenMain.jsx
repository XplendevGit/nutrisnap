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
import BottomNavBar from '../components/BottomNavBar';
import { useRouter } from 'expo-router';
import CustomAlert from '../components/customAlert'; // Asegúrate de ajustar la ruta si es diferente

const ScreenMain = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [alertVisible, setAlertVisible] = useState(false); // Estado para controlar el CustomAlert
  const [containerImages, setContainerImages] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
  });

  const containerConfigs = [
    {
      id: 0,
      backgroundColor: '#3CC4B9',
      title: 'Analizar Producto',
      subtitle: '',
      icon: 'search-outline',
      isPremium: false,
      onPress: () => handleImageUpload(0),
    },
    {
      id: 1,
      backgroundColor: '#FF5722',
      title: 'Comparar Productos',
      subtitle: '0 Productos',
      icon: 'swap-horizontal-outline',
      isPremium: true,
      onPress: () => router.push('../screens/screenCompareFood'),
    },
    {
      id: 2,
      backgroundColor: '#FFC107',
      title: 'Recetas Personalizadas',
      subtitle: '',
      icon: 'book-outline',
      isPremium: true,
      onPress: () => router.push('../screens/screenRecipes'),
    },
    {
      id: 3,
      backgroundColor: '#3F51B5',
      title: 'Planes Nutricionales',
      subtitle: '',
      icon: 'heart-outline',
      isPremium: true,
      onPress: () => router.push('../screens/screenNutritionPlans'),
    },
  ];

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

  const handlePress = (config) => {
    if (config.isPremium) {
      setAlertVisible(true); // Muestra el CustomAlert si es premium
    } else {
      config.onPress(); // Ejecuta la acción normal si no es premium
    }
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
          <Text className="text-lg text-gray-800 font-semibold">¡Hora de Snap!</Text>
          <Text className="text-2xl font-bold text-gray-900 mt-2">¿Qué Alimento Buscas?</Text>
          <View className="flex-row items-center mt-4 bg-white rounded-lg shadow-md p-4">
            <Ionicons name="search" size={20} color="#3CC4B9" />
            <TextInput
              placeholder="Pan Integral Pierre..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              className="flex-1 ml-2 text-gray-700"
            />
            <TouchableOpacity onPress={() => Alert.alert('Search', `Buscando: ${searchTerm}`)}>
              <Ionicons name="send" size={20} color="#3CC4B9" />
            </TouchableOpacity>
          </View>

          {/* Contenedores dinámicos */}
          <View className="mt-8">
            <View className="flex flex-wrap flex-row justify-between">
              {containerConfigs.map((config) => (
                <TouchableOpacity
                  key={config.id}
                  onPress={() => handlePress(config)}
                  className="w-[48%] aspect-square bg-white rounded-lg shadow-md p-4 mb-4"
                  style={{ backgroundColor: config.backgroundColor }}
                >
                  {containerImages[config.id] ? (
                    <Image
                      source={{ uri: containerImages[config.id] }}
                      className="absolute inset-0 w-full h-full rounded-lg"
                      style={{ resizeMode: 'cover' }}
                    />
                  ) : (
                    <View className="flex-1 justify-between pt-2">
                      <Text className="text-white font-bold text-lg">{config.title}</Text>
                      <Ionicons
                        name={config.icon}
                        size={32}
                        color="white"
                        className="absolute bottom-4 right-4"
                      />
                      {config.isPremium && (
                        <LottieView
                          source={require('../../assets/animations/star.json')}
                          autoPlay
                          loop
                          style={{
                            position: 'absolute',
                            top: 90,
                            right: -15,
                            width: 60,
                            height: 60,
                          }}
                        />
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botón animado */}
          <View className="mt-4 items-center">
            <TouchableOpacity onPress={() => Alert.alert('Acción', '¡Realizando acción adicional!')} className="w-20 h-20">
              <LottieView
                source={require('../../assets/animations/dados_animation_lottie.json')}
                autoPlay
                loop
                style={{ width: 80, height: 80 }}
              />
            </TouchableOpacity>
          </View>
        </MotiView>
      </ScrollView>

      {/* Footer NavBar */}
      <BottomNavBar />

      {/* Custom Alert para Premium */}
      <CustomAlert
        visible={alertVisible}
        type="error"
        title="Funcionalidad Premium"
        message="Esta funcionalidad está disponible solo para usuarios premium."
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default ScreenMain;
