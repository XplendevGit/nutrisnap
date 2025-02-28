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
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../../firebase-config";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import CustomAlert from "../../app/components/customAlert";
import activityService from "../services/ActivityService";

const ScreenRegister = () => {
  const router = useRouter();

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [objective, setObjective] = useState("");
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
      !objective.trim()
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

      // 📤 Subir imagen a ImgBB solo si el usuario seleccionó una diferente a la por defecto
      const uploadedImageUrl =
        profileImage !== "https://via.placeholder.com/150"
          ? await uploadImageToImgBB(profileImage)
          : "https://via.placeholder.com/150";

      // Datos del Registro de usuario
      const userData = {
        user_ID: user.uid,
        email,
        fullName,
        description: "No especificado",
        profileImage: uploadedImageUrl, // ✅ Imagen subida o la de por defecto
        objective,
        gender: "No especificado",
        activityLevel: "No especificado",
        diseases: "No especificado",
        conditions: "No especificado",
        diet: diet || "No especificado", // Si no se selecciona dieta, se asigna "No especificado"
        activities: activities.length > 0 ? activities : ["No especificado"], // Si no hay actividades, se asigna
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
      }, 2000);
    } catch (error) {
      showAlert("error", "Error", "No se pudo crear la cuenta, prueba con un Email diferente.");
    } finally {
      hideLoading();
    }
  };


  // 📤 Registrar y Subir imagen a ImgBB
  const uploadImageToImgBB = async (imageUri) => {
    const apiKey = "1a6c799783a8f073d11576343f1d0fbb"; // ✅ Tu API Key de ImgBB
    const formData = new FormData();
  
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "profile.jpg",
    });
  
    try {
      const response = await axios({
        method: "post",
        url: `https://api.imgbb.com/1/upload?key=${apiKey}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.success) {
        console.log("✅ Imagen subida con éxito:", response.data.data.url);
        return response.data.data.url; // URL de la imagen subida
      } else {
        console.error("❌ Error en la carga de ImgBB:", response.data);
        return "https://via.placeholder.com/150"; // Imagen por defecto si falla
      }
    } catch (error) {
      console.error("❌ Error al subir imagen:", error.response?.data || error.message);
      return "https://via.placeholder.com/150"; // Imagen por defecto en caso de error
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          className=""
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <StatusBar style="light" />

        {/* Cargando Loading */}
          {isLoading && (
            <View className="absolute w-screen h-full inset-0 bg-black/50 flex justify-center items-center z-50">
              <ActivityIndicator size="large" color="#3CC4B9" />
              <Text className="text-white text-lg mt-4">Registrando...</Text>
            </View>
          )}

        {/* Custom Alert */}
          <CustomAlert
            visible={alert.visible}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={handleAlertClose}
          />

        {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push("../screens/screenLogin")}
            className="absolute top-10 left-4 bg-white p-3 rounded-full shadow-md"
          >
            <MaterialIcons name="arrow-back" size={24} color="#3CC4B9" />
          </TouchableOpacity>

        {/* Imagen Button */}
          <TouchableOpacity
            onPress={handleImagePick}
            className="flex items-center mb-6 mt-24"
          >
            <Image
              source={{ uri: profileImage }}
              className="w-24 h-24 rounded-full border-2 border-[#3CC4B9]"
            />
            <Text className="text-[#3CC4B9] mt-2">Cambiar Imagen</Text>
          </TouchableOpacity>

        {/* Nombre TextInput */}
          <TextInput
            placeholder="Nombre"
            value={fullName}
            onChangeText={setFullName}
            className="bg-gray-100 rounded-full px-4 py-2 mb-3 mx-4"
          />

          {/* Email TextInput */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className="bg-gray-100 rounded-full px-4 py-2 mb-3 mx-4"
          />

        {/* Contraseña TextInput */}
          <View className="relative mb-3">
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              className="bg-gray-100 rounded-full px-4 py-2 pr-10 mx-4"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-3 mx-4"
            >
              <FontAwesome
                name={passwordVisible ? "eye" : "eye-slash"}
                size={20}
                color="#3CC4B9"
              />
            </TouchableOpacity>
          </View>

        {/* Confirmar Contraseña TextInput */}
          <View className="relative mb-4">
            <TextInput
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmPasswordVisible}
              className="bg-gray-100 rounded-full px-4 py-2 pr-10 mx-4"
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-4 top-3 mx-4"
            >
              <FontAwesome
                name={confirmPasswordVisible ? "eye" : "eye-slash"}
                size={20}
                color="#3CC4B9"
              />
            </TouchableOpacity>
          </View>

        {/* Objetivo TextInput */}
          <View className="relative mb-3">
          <TextInput
            placeholder="Objetivo"
            value={objective}
            onChangeText={setObjective}
            className="bg-gray-100 rounded-full px-4 py-2 mb-6 mx-4"
          />
          </View>
          

        {/* Selección Dieta Section*/}
          <Text className="text-xl font-bold text-[#3CC4B9] mb-4 text-center">Selecciona tu dieta</Text>
          <View className="flex flex-wrap flex-row gap-2 mb-6 justify-center">
            {["Carnívoro", "Vegetariano", "Vegano", "Pescetariano", "Sin Restricciones", "Otro"].map(
              (option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleSelectDiet(option)}
                  className={`px-4 py-2 rounded-full ${
                    diet === option ? "bg-[#3CC4B9]" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`${
                      diet === option ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>

        {/* Actividades Section */}
          <Text className="text-xl font-bold text-[#3CC4B9] mb-4 text-center">Selecciona tus actividades</Text>
          <View className="flex flex-wrap flex-row gap-2 mb-6 justify-center">
            {activityService.getActivityNames().map((activity) => (
              <TouchableOpacity
                key={activity}
                onPress={() => handleSelectActivity(activity)}
                className={`flex flex-row px-4 py-2 rounded-full space-x-1 space-y-[1.8px] ${
                  activities.includes(activity) ? "bg-[#3CC4B9]" : "bg-gray-100"
                }`}
              >

              <Text
                  className={`${
                    activities.includes(activity) ? "text-white" : "text-gray-500"
                  }`}
                >
                  {activity}
                </Text>

              <MaterialIcons
                   name={activityService.getActivityIcon(activity)}
                   size={16}
                   color={activities.includes(activity) ? "#FFFFFF" : "#3CC4B9"}
               />
              </TouchableOpacity>
            ))}
          </View>

        {/* Crear Cuenta Button */}
          <TouchableOpacity
            onPress={handleCreateAccount}
            className="flex h-[50px] w-[90%] bg-[#3CC4B9] rounded-full mx-auto justify-center items-center"
          >
            <Text className="text-[#FFFFFF] text-[16px] font-bold">Crear Cuenta</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ScreenRegister;
