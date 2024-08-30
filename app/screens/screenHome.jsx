import React, { useState } from 'react';
import { View, Text, Image, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons'; // Importa el ícono de Google desde React Icons
import { auth } from '../../firebase-config'; // Importa auth desde firebase.config
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const ScreenHome = ({
  backgroundImage,
  onLoginPress,
  onRegisterPress,
  loginText = "Iniciar Sesión",
  registerText = "Registrarse",
  footerText = "Elige lo mejor para tu salud",
  footerSubText = "Un vistazo es suficiente!",
}) => {

  //Estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Cuenta creada');
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Inicio Correcto!');
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const router = useRouter();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Animated.View 
          entering={FadeInDown.delay(100).springify()} 
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <StatusBar style="light" />
          
          {/* Imagen de Fondo del Home */}
          <Image 
            className="absolute w-full h-full"
            source={backgroundImage}
            resizeMode="cover" 
          />

          {/* Vista de TextInput Usuario */}
          <View className="flex w-full h-[100px] mb-[200px] space-y-4 items-center justify-center"> 
            <TextInput
              className="flex h-[56px] w-[300px] bg-[#f1f1f1] rounded-full px-4"
              placeholder="Usuario"
              placeholderTextColor="#888"
              onChangeText={(text) => setEmail(text)}
            />

            {/* Vista de TextInput Contraseña */}
            <TextInput
              className="flex h-[56px] w-[300px] bg-[#f1f1f1] rounded-full px-4"
              placeholder="Contraseña"
              placeholderTextColor="#888"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />

            {/* Vista de Botón Iniciar Sesión */}
            <TouchableOpacity
              className="flex h-[56px] w-[300px] bg-[#388E3C] rounded-full mx-auto justify-center items-center"
              onPress={handleSignIn}
            >
              <Text className="text-[#FFFFFF] text-[16px]">
                {loginText}
              </Text>
            </TouchableOpacity>

            {/* Vista de Botón Crear Cuenta */}
            <TouchableOpacity
              className="flex flex-row items-center justify-center h-[56px] w-[300px] bg-[#F57C00] rounded-full mx-auto"
              onPress={handleCreateAccount}
            >
              <AntDesign name="google" size={24} color="#FFFFFF" />
              <Text className="text-[#FFFFFF] text-[16px] ml-2">
                Crear Cuenta
              </Text>
            </TouchableOpacity>

            {/* Vista de Botón Registrarse */}
            <TouchableOpacity
              className="flex h-[56px] w-[300px] bg-[#81C784] rounded-full mx-auto justify-center items-center"
              onPress={() => router.push('../screens/screenRegister')}
            >
              <Text className="text-[#ffffff] text-[16px]">
                {registerText}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex items-center pb-6">
            <Text style={{ fontSize: hp(2.5), color: '#4CAF50' }}>
              {footerText.split(' ').map((word, index) => (
                <Text key={index}>
                  {word === "mejor" || word === "salud" 
                  ?
                 <Text className="font-bold">{word} </Text> 
                  : 
                  `${word} `}
                </Text>
              ))}
            </Text>
            <Text className="text-[#4CAF50] text-[20px]">
              {footerSubText}
            </Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenHome;
