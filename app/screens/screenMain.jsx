import React from 'react';
import { View, Text } from 'react-native';
import BottomNavBar from './BottomNavBar'; // Asegúrate de importar el componente

const ScreenMain = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <Text className="text-center text-lg font-bold text-green-700 mt-4">Bienvenido a NutriSnap</Text>
      {/* Contenido Principal */}
      <View className="flex-1"></View>

      {/* Footer NavBar */}
      <BottomNavBar />
    </View>
  );
};

export default ScreenMain;
