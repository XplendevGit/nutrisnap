import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { MotiView } from 'moti';
import BottomNavBar from './BottomNavBar';

const ScreenProfile = () => {
  return (
    <View className="flex-1 bg-gray-50 relative">
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

          {/* Estadísticas */}
          <View className="flex-row justify-around mt-6">
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-800">870</Text>
              <Text className="text-sm text-gray-500">Following</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-800">120k</Text>
              <Text className="text-sm text-gray-500">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-800">354k</Text>
              <Text className="text-sm text-gray-500">Likes</Text>
            </View>
          </View>
        </MotiView>

        {/* Seguidores */}
        <View className="mt-8">
          <View className="flex-row justify-between px-4">
            <Text className="text-lg font-bold text-gray-800">Followers</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-500">View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal className="mt-4 px-4" showsHorizontalScrollIndicator={false}>
            {['Isaiah', 'Jayden', 'Hunter', 'Ethel', 'Kim'].map((name, index) => (
              <View key={index} className="items-center mr-4">
                <Image
                  source={{
                    uri: 'https://via.placeholder.com/50', // Cambiar por fotos de seguidores
                  }}
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
                <Text className="text-sm text-gray-600 mt-2">{name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Publicaciones */}
        <View className="mt-8 px-4">
          <Text className="text-lg font-bold text-gray-800">Posts</Text>
          <View className="flex-row flex-wrap justify-between mt-4">
            {[1, 2, 3, 4, 5, 6].map((post, index) => (
              <Image
                key={index}
                source={{
                  uri: 'https://via.placeholder.com/100', // Cambiar por fotos de publicaciones
                }}
                className="w-[30%] h-24 rounded-lg mb-4"
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer NavBar fijo */}
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavBar />
      </View>
    </View>
  );
};

export default ScreenProfile;
