import React, { useState } from 'react';
import { View, Text, Image, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../../firebase-config'; // Importa auth desde firebase.config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Necesario para expo-auth-session
WebBrowser.maybeCompleteAuthSession();

const ScreenHome = ({
  backgroundImage,
  onLoginPress,
  onRegisterPress,
  loginText = "Iniciar Sesión",
  registerText = "Registrarse",
  footerText = "Elige lo mejor para tu salud",
  footerSubText = "Un vistazo es suficiente!",
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  // Configuración de Google Sign-In con expo-auth-session
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  const router = useRouter();

  // Función para manejar el SignIn con Google
  const handleGoogleSignIn = async () => {
    const result = await promptAsync();
    if (result.type === 'success') {
      const { id_token } = result.params;

      // Crear credenciales para Firebase con el token de Google
      const credential = GoogleAuthProvider.credential(id_token);

      // Iniciar sesión en Firebase con Google
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log('Inicio de sesión con Google exitoso', userCredential.user);
          router.push('./screenProfile'); // Navegar a la pantalla de perfil
        })
        .catch((error) => {
          console.error('Error en la autenticación con Google:', error);
        });
    } else {
      console.log('Google SignIn cancelado o fallido');
    }
  };

  // Función para manejar el inicio de sesión con correo y contraseña
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Inicio Correcto!');
        const user = userCredential.user;
        router.push('./screenProfile'); // Navegar a la pantalla de perfil
        console.log(user);
      })
      .catch((error) => {
        alert('Introduza un Email o Contraseña Validos');
        console.log(error.message);
      });
  };

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

          {/* Vista de TextInput Email */}
          <View className="flex w-full h-[100px] mb-[200px] space-y-4 items-center justify-center"> 
            <TextInput
              className="flex h-[56px] w-[300px] bg-[#f1f1f1] rounded-full px-4"
              placeholder="Email"
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

            {/* Vista de Botón Iniciar Con Google */}
            <TouchableOpacity
              className="flex flex-row items-center justify-center h-[56px] w-[300px] bg-[#F57C00] rounded-full mx-auto"
              onPress={handleGoogleSignIn}
              disabled={!request}
            >
              <AntDesign name="google" size={24} color="#FFFFFF" />
              <Text className="text-[#FFFFFF] text-[16px] ml-2">
                Iniciar Sesión con Google
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