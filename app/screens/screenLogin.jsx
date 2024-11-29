import React, { useState } from "react";
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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../firebase-config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";


// Necesario para expo-auth-session
WebBrowser.maybeCompleteAuthSession();

// Ruta del logo
const logoImage = require("../../assets/images/Logo1.png");

const ScreenLogin = ({
  loginText = "Iniciar Sesión",
  registerText = "Registrarse",
  footerText = "Elige lo mejor para tu salud",
  footerSubText = "Un vistazo es suficiente!",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Configuración de Google Sign-In con expo-auth-session
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
  });

  // Función para manejar el inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    const result = await promptAsync();
    if (result.type === "success") {
      const { id_token } = result.params;

      try {
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        console.log("Inicio de sesión con Google exitoso", userCredential.user);
        router.push("../screens/screenMain");
      } catch (error) {
        console.error("Error en la autenticación con Google:", error);
        Alert.alert("Error", "No se pudo iniciar sesión con Google.");
      }
    } else {
      console.log("Google Sign-In cancelado o fallido");
    }
  };

  // Función para manejar el inicio de sesión con correo y contraseña
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingresa un email y contraseña válidos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio Correcto!", userCredential.user);
      router.push("../screens/screenMain");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
      Alert.alert("Error", "Email o contraseña incorrectos.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Animated.View
          className="bg-white"
          entering={FadeInDown.delay(100).springify()}
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
        >
          <StatusBar style="light" />

          {/* Logo */}
          <View className="flex items-center mt-10 mb-6">
            <Image
              source={logoImage}
              style={{
                width: 150,
                height: 150,
                resizeMode: "contain",
              }}
            />
          </View>

          {/* Inputs y Botones */}
          <View className="flex w-full space-y-4 items-center justify-center">
            <TextInput
              className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4 border-[1px] border-[#3CC4B9]"
              placeholder="Email"
              placeholderTextColor="#888"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4 border-[1px] border-[#3CC4B9]"
              placeholder="Contraseña"
              placeholderTextColor="#888"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />

            <TouchableOpacity
              className="flex h-[56px] w-[90%] bg-[#3CC4B9] rounded-full mx-auto justify-center items-center"
              onPress={handleSignIn}
            >
              <Text className="text-[#FFFFFF] text-[16px]">{loginText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex flex-row items-center justify-center h-[56px] w-[90%] bg-[#F57C00] rounded-full mx-auto"
              onPress={handleGoogleSignIn}
              disabled={!request}
            >
              <AntDesign name="google" size={24} color="#FFFFFF" />
              <Text className="text-[#FFFFFF] text-[16px] ml-2">
                Iniciar Sesión con Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex h-[56px] w-[90%] bg-[#81C784] rounded-full mx-auto justify-center items-center"
              onPress={() => router.push("../screens/screenRegister")}
            >
              <Text className="text-[#ffffff] text-[16px]">{registerText}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex items-center mt-20">
            <Text style={{ fontSize: 16, color: "#3CC4B9", fontWeight: "bold" }}>
              {footerText}
            </Text>
            <Text className="text-[#3CC4B9] text-[20px]">{footerSubText}</Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenLogin;
