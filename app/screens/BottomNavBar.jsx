import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';

const BottomNavBar = () => {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push('../screens/screenProfile'); // Navega a ScreenProfile
  };

  const handleMainPress = () => {
    router.push('../screens/screenMain'); // Navega a ScreenMain
  };

  const handleNewsPress = () => {
    router.push('../screens/screenPosts'); // Navega a ScreenNews
  };

  const handlePaymentPress = () => {
    router.push('../screens/screenPayment'); // Navega a ScreenPayment
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
        className="flex items-center"
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
        <Text className="text-[16px] text-[#3CC4B9]">News</Text>
      </TouchableOpacity>

      {/* Botón Noticias */}
      <TouchableOpacity         onPress={handleNewsPress}
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
        <Text className="pt-[1px] text-[16px] text-[#3CC4B9]">Scan</Text>
      </TouchableOpacity>

      {/* Botón Central (Logo1) */}
      <TouchableOpacity
        onPress={handleMainPress}
        className="relative flex items-center "
      >
        <View
          className="rounded-full bg-[#3CC4B9] flex flex-row items-center justify-center shadow-lg"
          style={{ width: 60, height: 60 }}
        >
          <Image
            source={require('../../assets/images/Logo1_all_white.png')} // Ruta de la imagen central
            style={{ width: 35, height: 35, resizeMode: 'contain' }}
          />
        </View>
      </TouchableOpacity>

      {/* Botón Registros */}
      <TouchableOpacity onPress={handlePaymentPress} className="flex items-center pt-[2px]">
      <View
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        <Image
          source={require('../../assets/images/registro.png')} // Ruta del archivo PNG
          style={{
            width: 38,
            height: 38,
          }}
        />
        </View>
        <Text className="pt-[1px] text-[16px] text-[#3CC4B9]">Registro</Text>
      </TouchableOpacity>

      {/* Botón Mi Perfil */}
      <TouchableOpacity onPress={handleProfilePress} className="pt-[3px] flex items-center">
      <View
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        <Image
          source={require('../../assets/images/perfil.png')} // Ruta del archivo PNG
          style={{
            width: 32,
            height: 32,
          }}
        />
        </View>
        <Text className="pt-[1px] text-[16px] text-[#3CC4B9]">Perfil</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

export default BottomNavBar;
