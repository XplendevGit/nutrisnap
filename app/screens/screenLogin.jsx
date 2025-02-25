import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../firebase-config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import CustomAlert from "../../app/components/customAlert";

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
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: "", title: "", message: "" });
  const router = useRouter();

  // Configuración de Google Sign-In con expo-auth-session
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
  });

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await promptAsync();
      if (result.type === "success") {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        showSuccessAlert();
      }
    } catch (error) {
      showErrorAlert("No se pudo iniciar sesión con Google.");
    } finally {
      setLoading(false);
    }
  };

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const showSuccessAlert = () => {
    setAlert({
      visible: true,
      type: "success",
      title: "¡Inicio de Sesión Exitoso!",
      message: "Bienvenido a NutriSnap.",
    });
  
    setTimeout(() => {
      // Redirigir directamente después de 3 segundos
      router.replace("../screens/screenMain");
      setAlert({ visible: false });
    }, 2000);
  };
  
  const handleAlertClose = () => {
    setAlert({ visible: false });
    // Redirigir si es un éxito
    if (alert.type === "success") {
      router.replace("../screens/screenMain");
    }
  };
  

  const showErrorAlert = (message) => {
    setAlert({
      visible: true,
      type: "error",
      title: "Error",
      message,
    });
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      showErrorAlert("Por favor, ingresa un email y contraseña válidos.");
      return;
    }

    showLoading();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showSuccessAlert();
    } catch (error) {
      showErrorAlert("Email o contraseña incorrectos.");
    } finally {
      hideLoading();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Animated.View
          className="bg-white"
          entering={FadeInDown.delay(100).springify()}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <StatusBar style="light" />

          {/* CustomAlert */}
          <CustomAlert
            visible={alert.visible}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={handleAlertClose}
          />

          {/* Loading Overlay */}
          {loading && (
            <View className="absolute w-full h-full inset-0 bg-black/50 flex justify-center items-center z-50">
              <ActivityIndicator size="large" color="#3CC4B9" />
              <Text className="text-[#FFFFFF] text-lg mt-4">Cargando...</Text>
            </View>
          )}

          {/* Logo NutriSnap */}
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
          <View className="flex w-full space-y-2 items-center justify-center">
            {/* Email Input */}
            <TextInput
              className="flex h-[50px] w-[90%] bg-[#f1f1f1] rounded-full px-4"
              placeholder="Email"
              placeholderTextColor="#888"
              onChangeText={(text) => setEmail(text)}
            />

            {/* Contraseña Input */}
            <TextInput
              className="flex h-[50px] w-[90%] bg-[#f1f1f1] rounded-full px-4"
              placeholder="Contraseña"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />

            {/* Iniciar Sesión Button */}
            <TouchableOpacity
              className="flex h-[50px] w-[90%] bg-[#3CC4B9] rounded-full mx-auto justify-center items-center"
              onPress={handleSignIn}
            >
              <Text className="text-[#FFFFFF] text-[16px] font-bold">{loginText}</Text>
            </TouchableOpacity>

            {/* Iniciar con Google Button */}
{/*
<TouchableOpacity
  className="flex flex-row items-center justify-center h-[56px] w-[90%] bg-[#ea580c] rounded-full mx-auto"
  onPress={handleGoogleSignIn}
  disabled={!request}
>
  <AntDesign name="google" size={24} color="#FFFFFF" />
  <Text className="text-[#FFFFFF] text-[16px] font-bold ml-2">
    Iniciar Sesión con Google
  </Text>
</TouchableOpacity>
*/}

            {/* Registrarse Button */}
            <TouchableOpacity
              className="flex h-[50px] w-[90%] bg-[#23C55E] rounded-full mx-auto justify-center items-center"
              onPress={() => router.push("../screens/screenRegister")}
            >
              <Text className="text-[#ffffff] text-[16px] font-bold">{registerText}</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Text */}
          <View className="flex items-center mt-20">
            <Text className="text-[#3CC4B9] text-[16px] font-bold">{footerText}</Text>
            <Text className="text-[#3CC4B9] text-[20px] font-bold">{footerSubText}</Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenLogin;
