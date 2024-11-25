import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../../firebase-config'; // Importa auth desde firebase.config
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Necesario para expo-auth-session
WebBrowser.maybeCompleteAuthSession();

// Importa la imagen de fondo
const backgroundImage = require('../../assets/images/Fondo1.png');

const ScreenLogin = ({
  loginText = 'Iniciar Sesión',
  registerText = 'Registrarse',
  footerText = 'Elige lo mejor para tu salud',
  footerSubText = 'Un vistazo es suficiente!',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Configuración de Google Sign-In con expo-auth-session
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  // Función para manejar el inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    const result = await promptAsync();
    if (result.type === 'success') {
      const { id_token } = result.params;

      try {
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        console.log('Inicio de sesión con Google exitoso', userCredential.user);
        router.push('../screens/screenMain'); // Navegar a la pantalla principal
      } catch (error) {
        console.error('Error en la autenticación con Google:', error);
        Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
      }
    } else {
      console.log('Google Sign-In cancelado o fallido');
    }
  };

  // Función para manejar el inicio de sesión con correo y contraseña
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa un email y contraseña válidos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio Correcto!', userCredential.user);
      router.push('../screens/screenMain'); // Navegar a la pantalla principal
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
      Alert.alert('Error', 'Email o contraseña incorrectos.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <StatusBar style="light" />

          {/* Imagen de Fondo */}
          <Image
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            source={backgroundImage}
            resizeMode="cover"
          />

          {/* Inputs y Botones */}
          <View className="flex w-full h-[100px] mb-[200px] space-y-4 items-center justify-center">
            <TextInput
              className="flex h-[56px] w-[300px] bg-[#f1f1f1] rounded-full px-4"
              placeholder="Email"
              placeholderTextColor="#888"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              className="flex h-[56px] w-[300px] bg-[#f1f1f1] rounded-full px-4"
              placeholder="Contraseña"
              placeholderTextColor="#888"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />

            <TouchableOpacity
              className="flex h-[56px] w-[300px] bg-[#388E3C] rounded-full mx-auto justify-center items-center"
              onPress={handleSignIn}
            >
              <Text className="text-[#FFFFFF] text-[16px]">{loginText}</Text>
            </TouchableOpacity>

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

            <TouchableOpacity
              className="flex h-[56px] w-[300px] bg-[#81C784] rounded-full mx-auto justify-center items-center"
              onPress={() => router.push('../screens/screenRegister')}
            >
              <Text className="text-[#ffffff] text-[16px]">{registerText}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex items-center pb-6">
            <Text style={{ fontSize: 16, color: '#4CAF50', fontWeight: 'bold' }}>
              {footerText}
            </Text>
            <Text className="text-[#4CAF50] text-[20px]">{footerSubText}</Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenLogin;
