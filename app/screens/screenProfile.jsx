import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Manejo de navegación
import { MotiView } from 'moti';
import BottomNavBar from './BottomNavBar';

const ScreenProfile = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50 relative">
      {/* Botón de editar en la esquina superior derecha */}
      <TouchableOpacity
        onPress={() => router.push('../screens/screenEditUser')}
        className="absolute top-10 right-4 bg-blue-500 p-3 rounded-full shadow-md z-10"
      >
        <MaterialIcons name="edit" size={24} color="white" />
      </TouchableOpacity>

      {/* Contenido desplazable */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }} // Espacio para que el contenido no se superponga al NavBar
        className="flex-1"
      >
        {/* Animación del contenedor principal */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500 }}
          className="px-4 pt-8"
        >
          {/* Header con foto de perfil */}
          <View className="items-center">
            <Image
              source={{
                uri: 'https://via.placeholder.com/100', // Cambiar por foto de usuario
              }}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <Text className="text-xl font-bold text-gray-800 mt-4">Ophelia Coleman</Text>
            <Text className="text-sm text-gray-500">Los Angeles, CA</Text>
          </View>

          {/* Descripción */}
          <Text className="text-center text-sm text-gray-600 mt-4 px-4">
            I’m a positive person. I love to travel and eat. Always available for chat.
          </Text>

          {/* Botones de acciones */}
          <View className="flex-row justify-center space-x-6 mt-6">
            <TouchableOpacity className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md">
              <Feather name="message-circle" size={24} color="#388E3C" />
            </TouchableOpacity>
            <TouchableOpacity className="px-6 py-2 bg-blue-500 rounded-full shadow-md">
              <Text className="text-white font-bold">Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md">
              <AntDesign name="sharealt" size={24} color="#388E3C" />
            </TouchableOpacity>
          </View>
        </MotiView>
      </ScrollView>

      {/* Footer NavBar fijo */}
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavBar />
      </View>
    </View>
  );
};

export default ScreenProfile;
