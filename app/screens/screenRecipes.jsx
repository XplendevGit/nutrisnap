import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { MaterialIcons } from '@expo/vector-icons'; // Iconos actualizados
import { useRouter } from 'expo-router'; // Manejo de navegación

const screenRecipes = () => {
  const router = useRouter();
  
  const recipeOptions = [
    {
      title: 'Crear una Receta!',
      gradient: ['#6A8DFF', '#8DA4FF'],
      icon: 'document-text-outline', // Ionicons icon
    },
    {
      title: 'Mood boosters',
      gradient: ['#FF6B6B', '#FFA6A6'],
      icon: 'rocket-outline', // Ionicons icon
    },
    {
      title: 'Positive activities',
      gradient: ['#34C759', '#5CD787'],
      icon: 'happy-outline', // Ionicons icon
    },
    {
      title: 'Use your trigger plan',
      gradient: ['#5AC8FA', '#88DBFF'],
      icon: 'toggle-outline', // Ionicons icon
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6 pt-24">
      
      {/* Botón de regresar */}
      <TouchableOpacity
        onPress={() => router.push('../screens/screenMain')}
        className="absolute top-10 left-4 bg-white p-3 rounded-full shadow-md"
      >
        <MaterialIcons name="arrow-back" size={24} color="#3CC4B9" />
      </TouchableOpacity>
      {/* Title */}
      <Text className="text-2xl font-bold text-gray-800 mb-6">Crea o Vuelve a Tus Recetas!</Text>

      {/* Recipe Options */}
      {recipeOptions.map((option, index) => (
        <MotiView
          key={index}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: index * 0.1, type: 'timing', duration: 400 }}
          className="mb-4"
        >
          <TouchableOpacity className="rounded-xl overflow-hidden shadow-lg">
            <LinearGradient
              colors={option.gradient}
              className="flex-row items-center justify-between px-6 py-5"
            >
              <Text className="text-white text-lg font-semibold">
                {option.title}
              </Text>
              <Ionicons name={option.icon} size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </MotiView>
      ))}
    </View>
  );
};

export default screenRecipes;
