import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, PermissionsAndroid, Alert, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // Usamos el LinearGradient de expo

const tutorialData = [
  {
    image: require('../../assets/images/Logo1_all_white.png'), // Imagen de bienvenida
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
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={['#388E3C', '#66BB6A']} // Gradiente verde
        style={styles.container}
      >
        <Image source={tutorialData[index].image} style={styles.image} />
        <Text style={styles.text}>{tutorialData[index].text}</Text>

        {/* Botón de acción */}
        {tutorialData[index].buttonText && (
          <TouchableOpacity onPress={handleAction} style={styles.button}>
            <Text style={styles.buttonText}>{tutorialData[index].buttonText}</Text>
          </TouchableOpacity>
        )}

        {/* Barra de progreso */}
        <View style={styles.progressContainer}>
          {tutorialData.map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                i <= index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Texto que indica que puede deslizar */}
        <Text style={styles.swipeText}>Desliza para continuar</Text>
      </LinearGradient>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#81C784',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  swipeText: {
    position: 'absolute',
    bottom: 60,
    color: '#fff',
    fontSize: 14,
  },
});

export default ScreenTutorial;
