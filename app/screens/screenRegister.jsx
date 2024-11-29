import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../../firebase-config";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { WifiLoader } from "react-awesome-loaders"; // Importa el WifiLoader

const ScreenRegister = () => {
  const router = useRouter();

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [objective, setObjective] = useState("");
  const [conditions, setConditions] = useState("");
  const [diet, setDiet] = useState("");
  const [activities, setActivities] = useState([]);
  const [diseases, setDiseases] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  // Opciones
  const dietOptions = [
    "Carnivoro",
    "Vegetariano",
    "Vegano",
    "Pescetariano",
    "Sin Restricciones",
    "Otro",
  ];
  const activityOptions = [
    { name: "Yoga", icon: "meditation" },
    { name: "Correr", icon: "run" },
    { name: "Natación", icon: "swim" },
    { name: "Fútbol", icon: "soccer" },
    { name: "Ciclismo", icon: "bike" },
    { name: "Tenis", icon: "tennis" },
    { name: "Gimnasio", icon: "dumbbell" },
    { name: "Voleibol", icon: "volleyball" },
    { name: "Senderismo", icon: "hiking" },
    { name: "Patinaje", icon: "roller-skate" },
    { name: "Esquí", icon: "snowflake" },
  ];

  // Manejo de selección de imagen
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
      console.error("Error al seleccionar imagen:", error.message);
      Alert.alert("Error", "No se pudo seleccionar la imagen. Inténtalo nuevamente.");
    }
  };

  // Creación de cuenta y guardado en Firestore
  const handleCreateAccount = async () => {
    setIsLoading(true); // Muestra el indicador al inicio

    if (
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !fullName.trim() ||
      !objective.trim() ||
      !diet
    ) {
      setIsLoading(false); // Oculta el indicador si hay error
      Alert.alert("Error", "Todos los campos obligatorios deben ser completados.");
      return;
    }

    if (password !== confirmPassword) {
      setIsLoading(false); // Oculta el indicador si hay error
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        email: email.trim(),
        fullName: fullName.trim(),
        objective: objective.trim(),
        conditions: conditions.trim() || "No especificado",
        diet: diet || "No especificado",
        activities: activities.length > 0 ? activities : ["No especificadas"],
        diseases: diseases.trim() || "No especificadas",
        profileImage,
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // Muestra la transición antes de redirigir
      setTimeout(() => {
        setIsLoading(false); // Oculta el indicador
        router.push("../screens/screenMain");
      }, 2000);
    } catch (error) {
      setIsLoading(false); // Oculta el indicador si hay error
      console.error("Error al registrar el usuario:", error.message);
      Alert.alert("Error", "Error al registrar el usuario. Intenta con un correo diferente.");
    }
  };

  // Manejo de selección de dieta
  const handleSelectDiet = (option) => setDiet(option);

  // Manejo de selección de actividades
  const handleSelectActivity = (activity) => {
    setActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((act) => act !== activity)
        : [...prev, activity]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <StatusBar style="light" />

        {/* Botón de regresar */}
        <TouchableOpacity
          onPress={() => router.push("../screens/screenMain")}
          className="absolute top-10 left-4 bg-white p-3 rounded-full shadow-md"
        >
          <MaterialIcons name="arrow-back" size={24} color="#3CC4B9" />
        </TouchableOpacity>

        {/* Imagen de perfil */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 500 }}
          className="mb-4"
        >
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={{ uri: profileImage }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 10,
                borderWidth: 2,
                borderColor: "#3CC4B9",
              }}
            />
            <Text className="text-[#3CC4B9] text-center">Cambiar Imagen</Text>
          </TouchableOpacity>
        </MotiView>

        {/* Indicador de carga */}
        {isLoading && (
          <View className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80">
            <WifiLoader
              background={"transparent"}
              desktopSize={"150px"}
              mobileSize={"100px"}
              text={"Registrando..."}
              backColor={"#3CC4B9"}
              frontColor={"#4A90E2"}
            />
          </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenRegister;
