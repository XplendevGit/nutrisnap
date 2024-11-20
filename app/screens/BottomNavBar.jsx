import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; // Iconos más actuales
import { MotiView } from 'moti';

const BottomNavBar = ({ navigation }) => {
  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      className="absolute bottom-0 w-full bg-white shadow-md rounded-t-xl flex-row justify-between px-6 items-center py-4"
    >
      {/* Home Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} className="flex items-center">
        <Ionicons name="home-outline" size={28} color="#388E3C" />
        <Text className="text-xs text-gray-500">Inicio</Text>
      </TouchableOpacity>

      {/* News Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Tasks')} className="flex items-center">
        <MaterialCommunityIcons name="newspaper-variant-outline" size={28} color="#388E3C" />
        <Text className="text-xs text-gray-500">Noticias</Text>
      </TouchableOpacity>

      {/* Center Floating Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddTask')}
        className="relative flex items-center"
      >
        <View className="rounded-md border-2 bg-[#388E3C] border-[#388E3C] flex flex-row items-center justify-center px-1.5 py-1.5 shadow-lg">
          <Feather name="plus" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Records Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Payment')} className="flex items-center">
        <Ionicons name="document-text-outline" size={28} color="#388E3C" />
        <Text className="text-xs text-gray-500">Registros</Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity onPress={() => navigation.navigate('ScreenProfile')} className="flex items-center">
        <Ionicons name="person-outline" size={28} color="#388E3C" />
        <Text className="text-xs text-gray-500">Perfil</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

export default BottomNavBar;
