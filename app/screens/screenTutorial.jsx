import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient'; // Gradiente para fondo

const tutorialData = [
  {
    image: require('../../assets/images/Logo1_all_white.png'),
    text: "Donde podrás analizar alimentos de forma fácil.",
    title: "Bienvenido a NutriSnap",
  },
  {
    image: require('../../assets/images/scan_im-.png'),
    text: "Escanea, analiza y compara al instante con la potencia de nuestra inteligencia artificial.",
    title: "Potencia la nutrición inteligente",
    action: async () => {
      Alert.alert("Permisos solicitados", "Puedes configurar los permisos en tu dispositivo.");
    },
  },
  {
    image: require('../../assets/images/plans-.png'),
    text: "Obtén información y Planes detallados, personalizados. Crea y comparte recetas en tiempo real.",
    title: "Tu nutrición en tus manos",
  },
  {
    image: require('../../assets/images/log-.png'),
    text: "Regístrate o inicia como invitado para disfrutar de todas las funcionalidades que tenemos para ti.",
    title: "¡Comienza tu viaje con NutriSnap!",
    buttons: [
      { 
        text: "Ir a Login", 
        action: () => "login", 
        style: "bg-white border border-white", // Fondo blanco con borde
        textStyle: "text-[#3CC4B9]", // Texto azul
      },
      { 
        text: "Iniciar como Invitado", 
        action: () => "guest", 
        style: "bg-transparent border border-white", // Fondo transparente con borde
        textStyle: "text-white", // Texto blanco
      },
    ],
  },
];

const ScreenTutorial = () => {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("left");
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

  const handleAction = (action) => {
    if (action === "login") {
      router.push('../screens/screenLogin');
    } else if (action === "guest") {
      router.push('../screens/screenMain');
    } else if (tutorialData[index].action) {
      tutorialData[index].action();
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      className="flex-1"
    >
      <LinearGradient
        colors={['#3CC4B9', '#3CC4B9']}
        className="flex-1 justify-center items-center"
      >
        <MotiView
          key={index}
          from={{ opacity: 0, translateX: swipeDirection === "left" ? 50 : -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: swipeDirection === "left" ? -50 : 50 }}
          transition={{ type: 'spring', damping: 15 }}
          className="flex-1 justify-center items-center px-4"
        >
          <Image source={tutorialData[index].image} className="w-52 h-52 mb-8" />

          {/* Título */}
          <Text className="text-white text-2xl font-bold text-center mb-4">
            {tutorialData[index].title}
          </Text>

          {/* Texto descriptivo */}
          <Text className="text-white text-lg text-center mb-8">
            {tutorialData[index].text}
          </Text>

          {/* Botón o botones de acción */}
          {tutorialData[index].buttons ? (
            <View className="flex-row space-x-4">
              {tutorialData[index].buttons.map((button, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleAction(button.action())}
                  className={`px-6 py-3 rounded-full shadow-lg ${button.style}`}
                >
                  <Text className={`font-bold text-lg ${button.textStyle}`}>{button.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

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
