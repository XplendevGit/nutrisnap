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
        style={{ position: 'absolute', height: '100%', width: '100%' }} // Ajuste aquí
        source={backgroundImage}
        resizeMode="cover" // Asegura que la imagen se ajuste bien
      />

      <View className="flex w-full h-[200px] mb-[200px] space-y-4 items-center"> 
        <TouchableOpacity
          style={{ height: hp(7), width: wp(80), backgroundColor: '#388E3C', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
          onPress={onLoginPress}
        >
          <Text style={{ color: '#FFFFFF', fontSize: hp(2) }}>
            {loginText}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ height: hp(7), width: wp(80), backgroundColor: '#81C784', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
          onPress={onRegisterPress}
        >
          <Text style={{ color: '#333333', fontSize: hp(2) }}>
            {registerText}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', paddingBottom: 12 }}>
        <Text style={{ fontSize: hp(2.5), color: '#4CAF50' }}>
          {footerText.split(' ').map((word, index) => (
            <Text key={index}>
              {word === "mejor" || word === "salud" ? <Text style={{ fontWeight: 'bold' }}>{word} </Text> : `${word} `}
            </Text>
          ))}
        </Text>
        <Text style={{ fontSize: hp(2.5), color: '#4CAF50' }}>
          {footerSubText}
        </Text>
      </View>
    </Animated.View>
  );
};

export default PantallaInicio;
