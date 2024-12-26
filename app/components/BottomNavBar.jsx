import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { MotiView } from 'moti';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const BottomNavBar = () => {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push('../screens/screenProfile');
  };

  const handleMainPress = () => {
    router.push('../screens/screenMain');
  };

  const handleNewsPress = () => {
    router.push('../screens/screenPosts');
  };

  const handlePaymentPress = () => {
    router.push('../screens/screenPayment');
  };

  const handleScanPress = async () => {
    // Solicitar permisos de la cámara
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permiso requerido",
        "Se necesita acceso a la cámara para usar esta funcionalidad."
      );
      return;
    }

    // Abrir la cámara
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      // Navegar a la pantalla de resultados con la imagen capturada
      router.push({
        pathname: '../screens/screenResult', // Ruta de la pantalla de resultados
        params: { imageUri: result.assets[0].uri }, // Pasar la imagen capturada
      });
    }
  };

  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      className="absolute bottom-0 w-full bg-white shadow-md rounded-t-xl flex-row justify-between px-6 py-4"
    >
      {/* Botón Animado (Lottie) */}
      <TouchableOpacity
        onPress={handleNewsPress}
        className="flex items-center pt-[1px]"
        style={{ width: 50, height: 50 }}
      >
        <View
          style={{
            width: 28,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LottieView
            source={require('../../assets/animations/icon3.json')} // Ruta del archivo Lottie
            autoPlay
            loop
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <Text className="text-[16px] text-primary">News</Text>
      </TouchableOpacity>

      {/* Botón Escanear */}
      <TouchableOpacity
        onPress={handleScanPress}
        className="flex items-center pt-[1px]"
        style={{ width: 50, height: 50 }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/images/escanear.png')} // Ruta del archivo PNG
            style={{
              width: 28,
              height: 28,
            }}
          />
        </View>
        <Text className="pt-[1px] text-[16px] text-primary">Scan</Text>
      </TouchableOpacity>

      {/* Botón Central (Logo1) */}
      <TouchableOpacity
        onPress={handleMainPress}
        className="relative flex items-center"
      >
        <View
          className="rounded-full bg-primary flex flex-row items-center justify-center shadow-lg"
          style={{ width: 60, height: 60 }}
        >
          <Image
            source={require('../../assets/images/Logo1_all_white.png')} // Ruta de la imagen central
            style={{ width: 35, height: 35, resizeMode: 'contain' }}
          />
        </View>
      </TouchableOpacity>

      {/* Botón Suscripción */}
      <TouchableOpacity
        onPress={handlePaymentPress}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <View
          style={{
            width: 30, // Ancho del contenedor
            height: 30, // Alto del contenedor
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
                        <LottieView 
                          source={require('../../assets/animations/star.json')}
                          autoPlay
                          loop
                          style={{
                            position: 'flex',
                            top: 0,
                            right: 0,
                            width: 55,
                            height: 55,
                            marginBottom: 4,
                          }}
                        />
        </View>
        <Text style={{ paddingTop: 0, fontSize: 16, color: '#3CC4B9' }}>Premium</Text>
      </TouchableOpacity>

      {/* Botón Mi Perfil */}
      <TouchableOpacity onPress={handleProfilePress} className="pt-[3px] flex items-center">
        <View
          style={{
            width: 33,
            height: 29,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/images/profile.png')} // Ruta del archivo PNG
            style={{
              width: 40,
              height: 38,
            }}
          />
        </View>
        <Text className="pt-[2px] text-[16px] text-primary">Perfil</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

export default BottomNavBar;
