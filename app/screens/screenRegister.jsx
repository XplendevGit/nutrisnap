import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config'; // Asegúrate de importar auth desde firebase.config

const ScreenRegister = () => {
  const router = useRouter();

  // Estados para capturar email y contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Crear cuenta en Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Cuenta creada:', userCredential.user);
        alert('¡Cuenta creada exitosamente!');
        router.push('/screenProfile'); // Navegar a la pantalla de perfil
      })
      .catch((error) => {
        console.error('Error en la creación de cuenta:', error.message);
        alert('El Email ingresado ya esta registrado');
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        className="bg-white"
        entering={FadeInDown.delay(100).springify()}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20 }}
      >
        <StatusBar style="light" />

        {/* Flecha para volver */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: 'absolute', top: 50, left: 20 }}
        >
          <AntDesign name="arrowleft" size={24} color="#388E3C" />
        </TouchableOpacity>

        {/* Título */}
        <View className="mb-10">
          <Text className="text-[32px] text-center font-bold text-[#388E3C]">
            ¡Regístrate en{' '}
            <Text className="text-[#81C784]">NutriSnap</Text>!
          </Text>
        </View>

        {/* Campos de entrada */}
        <View className="space-y-4 w-full items-center">
          <TextInput
            className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4"
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4"
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4"
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>

        {/* Botón de registro */}
        <TouchableOpacity
          className="flex h-[56px] w-[90%] bg-[#388E3C] rounded-full mt-10 justify-center items-center"
          onPress={handleCreateAccount} // Llamar la función de creación de cuenta
        >
          <Text className="text-[#FFFFFF] text-[16px]">Crear Cuenta</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ScreenRegister;
