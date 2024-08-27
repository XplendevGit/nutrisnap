import React from 'react';
import { View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

const PantallaInicio = ({
  backgroundImage,
  onLoginPress,
  onRegisterPress,
  loginText = "Iniciar Sesión",
  registerText = "Registrarse",
  footerText = "Elige lo mejor para tu salud",
  footerSubText = "Un vistazo es suficiente!",
}) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(100).springify()} 
      style={{ flex: 1, justifyContent: 'flex-end' }} // Ajuste aquí
    >
      <StatusBar style="light" />
      
      <Image 
        className="absolute w-full h-full"
        source={backgroundImage}
        resizeMode="cover" // Asegura que la imagen se ajuste bien
      />

      <View className="flex w-full h-[200px] mb-[200px] space-y-4 items-center"> 
        <TouchableOpacity
          className="flex h-[56px] w-[300px] bg-[#388E3C] rounded-full mx-auto justify-center items-center"
          onPress={onLoginPress}
        >
          <Text className="text-[#FFFFFF] text-[16px]">
            {loginText}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex h-[56px] w-[300px] bg-[#81C784] rounded-full mx-auto justify-center items-center"
          onPress={onRegisterPress}
        >
          <Text className="text-[#333333] text-[16px]">
            {registerText}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex items-center pb-6">
        <Text style={{ fontSize: hp(2.5), color: '#4CAF50' }}>
          {footerText.split(' ').map((word, index) => (
            <Text key={index}>
              {word === "mejor" || word === "salud" ? <Text className="font-bold" >{word} </Text> : `${word} `}
            </Text>
          ))}
        </Text>
        <Text className="text-[#4CAF50] text-[20px]">
          {footerSubText}
        </Text>
      </View>
    </Animated.View>
  );
};

export default PantallaInicio;
