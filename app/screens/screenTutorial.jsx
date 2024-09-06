import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useRouter } from 'expo-router';

const tutorialData = [
  {
    image: require('../../assets/images/react-logo.png'), // Imagen de bienvenida
    text: "Bienvenido a NutriSnap! Aquí podrás comparar productos de forma fácil.",
  },
  {
    image: require('../../assets/images/react-logo.png'), // Imagen de permisos de cámara
    text: "Necesitamos permisos de cámara para que puedas comparar productos con imágenes.",
    action: async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Permiso de cámara",
            message: "NutriSnap necesita acceder a la cámara para comparar productos.",
            buttonNeutral: "Preguntar luego",
            buttonNegative: "Cancelar",
            buttonPositive: "Aceptar"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permiso concedido");
        } else {
          Alert.alert("Permiso denegado");
        }
      } catch (err) {
        console.warn(err);
      }
    },
  },
  {
    image: require('../../assets/images/react-logo.png'), // Imagen de login
    text: "Regístrate o inicia sesión para acceder a todas las funcionalidades.",
    buttonText: "Ir a Login",
  },
  {
    image: require('../../assets/images/react-logo.png'), // Imagen de bienvenida final
    text: "¡Gracias por usar NutriSnap! ¡Vamos a empezar!",
    buttonText: "Iniciar",
  },
];

const ScreenTutorial = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const handleSwipeLeft = () => {
    if (index < tutorialData.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleSwipeRight = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleAction = () => {
    if (tutorialData[index].action) {
      tutorialData[index].action();
    }
    if (tutorialData[index].buttonText === "Ir a Login") {
      router.push('./ScreenLogin');
    }
    if (tutorialData[index].buttonText === "Iniciar") {
      router.push('./ScreenMain');
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image source={tutorialData[index].image} style={{ width: 200, height: 200 }} />
      <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 20 }}>{tutorialData[index].text}</Text>
      {tutorialData[index].buttonText && (
        <TouchableOpacity onPress={handleAction} style={{ backgroundColor: '#388E3C', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: '#fff' }}>{tutorialData[index].buttonText}</Text>
        </TouchableOpacity>
      )}
    </GestureRecognizer>
  );
};

export default ScreenTutorial;