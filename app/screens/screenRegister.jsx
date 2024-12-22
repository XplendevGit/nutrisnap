import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../../firebase-config";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import CustomAlert from "../../app/components/customAlert";

const ScreenRegister = () => {
  const router = useRouter();

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150" // Imagen por defecto
  );
  const [diet, setDiet] = useState("No especificado");
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: "", title: "", message: "" });

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const showAlert = (type, title, message) => {
    setAlert({ visible: true, type, title, message });
  };

  const handleAlertClose = () => {
    setAlert({ visible: false });
  };

  // Validar datos
  const isValidForm = () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !fullName.trim() ||
      !diet.trim() ||
      activities.length === 0
    ) {
      showAlert("error", "Error", "Todos los campos obligatorios deben ser completados.");
      return false;
    }

    if (password !== confirmPassword) {
      showAlert("error", "Error", "Las contraseñas no coinciden.");
      return false;
    }

    return true;
  };

  // Selección de imagen
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      showAlert("error", "Error", "No se pudo seleccionar la imagen.");
    }
  };

  const handleSelectDiet = (selectedDiet) => {
    setDiet(selectedDiet);
  };

  const handleSelectActivity = (selectedActivity) => {
    if (activities.includes(selectedActivity)) {
      setActivities(activities.filter((activity) => activity !== selectedActivity));
    } else {
      setActivities([...activities, selectedActivity]);
    }
  };

  // Registro de usuario
  const handleCreateAccount = async () => {
    if (!isValidForm()) return;

    showLoading();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Datos del usuario
      const userData = {
        user_ID: user.uid,
        email,
        fullName,
        description: "No especificado",
        profileImage,
        objective: "No especificado",
        gender: "No especificado",
        activityLevel: "No especificado",
        diseases: "No especificado",
        conditions: "No especificado",
        diet,
        activities,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        premiumStatus: false,
        usageLimits: {
          analyzeProduct: { limit: 5, used: 0 },
          compareProducts: { limit: 3, used: 0 },
          customRecipes: { limit: 1, used: 0 },
        },
        following: [],
        followers: [],
      };

      await setDoc(doc(db, "users", user.uid), userData);

      showAlert("success", "¡Éxito!", "Cuenta creada exitosamente.");
      setTimeout(() => {
        handleAlertClose();
        router.push("../screens/screenMain");
      }, 3000);
    } catch (error) {
      showAlert("error", "Error", "No se pudo crear la cuenta.");
    } finally {
      hideLoading();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          className="px-5 py-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <StatusBar style="light" />

          {isLoading && (
            <View className="absolute w-full h-full inset-0 bg-black/50 flex justify-center items-center z-50">
              <ActivityIndicator size="large" color="#3CC4B9" />
              <Text className="text-white text-lg mt-4">Registrando...</Text>
            </View>
          )}

          <CustomAlert
            visible={alert.visible}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={handleAlertClose}
          />

          <TouchableOpacity
            onPress={handleImagePick}
            className="flex items-center mb-6"
          >
            <Image
              source={{ uri: profileImage }}
              className="w-36 h-36 rounded-full border-2 border-[#3CC4B9]"
            />
            <Text className="text-[#3CC4B9] mt-2">Cambiar Imagen</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nombre"
            value={fullName}
            onChangeText={setFullName}
            className="bg-gray-100 rounded-full px-4 py-2 mb-4"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className="bg-gray-100 rounded-full px-4 py-2 mb-4"
          />

          <View className="relative mb-4">
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              className="bg-gray-100 rounded-full px-4 py-2 pr-10"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-3"
            >
              <FontAwesome
                name={passwordVisible ? "eye" : "eye-slash"}
                size={20}
                color="#3CC4B9"
              />
            </TouchableOpacity>
          </View>

          <View className="relative mb-4">
            <TextInput
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmPasswordVisible}
              className="bg-gray-100 rounded-full px-4 py-2 pr-10"
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-4 top-3"
            >
              <FontAwesome
                name={confirmPasswordVisible ? "eye" : "eye-slash"}
                size={20}
                color="#3CC4B9"
              />
            </TouchableOpacity>
          </View>

          <Text className="text-lg font-bold text-[#3CC4B9] mb-2">Selecciona tu dieta</Text>
          <View className="flex flex-wrap flex-row gap-2 mb-6">
            {["Carnívoro", "Vegetariano", "Vegano", "Pescetariano", "Sin Restricciones", "Otro"].map(
              (option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleSelectDiet(option)}
                  className={`px-4 py-2 rounded-full border ${
                    diet === option ? "bg-[#3CC4B9] text-white" : "border-gray-300"
                  }`}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          <Text className="text-lg font-bold text-[#3CC4B9] mb-2">Selecciona tus actividades</Text>
          <View className="flex flex-wrap flex-row gap-2 mb-6">
            {["Yoga", "Correr", "Natación", "Fútbol", "Ciclismo", "Gimnasio"].map((activity) => (
              <TouchableOpacity
                key={activity}
                onPress={() => handleSelectActivity(activity)}
                className={`px-4 py-2 rounded-full border ${
                  activities.includes(activity) ? "bg-[#3CC4B9] text-white" : "border-gray-300"
                }`}
              >
                <Text>{activity}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={handleCreateAccount}
            className="bg-[#3CC4B9] py-3 rounded-md"
          >
            <Text className="text-white font-bold text-center">Crear Cuenta</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ScreenRegister;
