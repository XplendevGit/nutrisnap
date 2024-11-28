import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient'; // Gradiente para fondo

const tutorialData = [
  {
    image: require('../../assets/images/Logo1_all_white.png'), // Imagen de bienvenida
    text: "Bienvenido a NutriSnap! donde podrás analizar alimentos de forma fácil.",
  },
  {
    image: require('../../assets/images/Logo1_all_white.png'), // Imagen de permisos de cámara
    text: "Necesitamos permisos de cámara para que puedas comparar productos con imágenes.",
    action: async () => {
      Alert.alert("Permisos solicitados", "Puedes configurar los permisos en tu dispositivo.");
    },
  },
  {
    image: require('../../assets/images/Logo1_all_white.png'), // Imagen de login
    text: "Regístrate o inicia sesión para acceder a todas las funcionalidades.",
    buttonText: "Ir a Login",
  },
  {
    image: require('../../assets/images/Logo1_all_white.png'), // Imagen de bienvenida final
    text: "Puedes Loguearte Después e Iniciar Ahora Mismo ¡Vamos a empezar!",
    buttonText: "Iniciar",
  },
];

const ScreenTutorial = () => {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("left"); // Dirección del deslizamiento
  const router = useRouter();

  const handleSwipeLeft = () => {
    if (index < tutorialData.length - 1) {
      setSwipeDirection("left");
      setIndex(index + 1);
    }
  };

  const handleSwipeRight = () => {
    if (index > 0) {
      setSwipeDirection("right");
      setIndex(index - 1);
    }
  };

  const handleAction = () => {
    if (tutorialData[index].action) {
      tutorialData[index].action();
    }
    if (tutorialData[index].buttonText === "Ir a Login") {
      router.push('../screens/screenLogin');
    }
    if (tutorialData[index].buttonText === "Iniciar") {
      router.push('../screens/screenMain');
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      className="flex-1"
    >
      <LinearGradient
        colors={['#3CC4B9', '#66BB6A']}
        className="flex-1 justify-center items-center"
      >
        <MotiView
          key={index} // Framer Motion cambia el componente al deslizar
          from={{ opacity: 0, translateX: swipeDirection === "left" ? 50 : -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: swipeDirection === "left" ? -50 : 50 }}
          transition={{ type: 'spring', damping: 15 }}
          className="flex-1 justify-center items-center px-4"
        >
          <Image source={tutorialData[index].image} className="w-52 h-52 mb-8" />
          <Text className="text-white text-lg text-center mb-8">{tutorialData[index].text}</Text>

          {/* Botón de acción */}
          {tutorialData[index].buttonText && (
            <TouchableOpacity
              onPress={handleAction}
              className="bg-[#81C784] px-6 py-3 rounded-lg mb-8"
            >
              <Text className="text-white text-base">{tutorialData[index].buttonText}</Text>
            </TouchableOpacity>
          )}

          {/* Barra de progreso */}
          <View className="absolute bottom-28 flex-row space-x-2">
            {tutorialData.map((_, i) => (
              <View
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= index ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </View>

          {/* Texto que indica que puede deslizar */}
          <Text className="absolute bottom-16 text-white text-sm">Desliza para continuar</Text>
        </MotiView>
      </LinearGradient>
    </GestureRecognizer>
  );
};

export default ScreenTutorial;
