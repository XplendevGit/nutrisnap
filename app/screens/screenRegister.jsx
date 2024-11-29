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
import { MaterialIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../../firebase-config";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";


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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Creación de cuenta y guardado en Firestore
  const handleCreateAccount = async () => {
    // Validación de campos obligatorios
    if (
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !fullName.trim() ||
      !diet
    ) {
      Alert.alert("Error", "Todos los campos obligatorios deben ser completados.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        email: email.trim(),
        fullName: fullName.trim(),
        objective: objective.trim() || "No especificado",
        conditions: conditions.trim() || "No especificado",
        diet: diet || "No especificado",
        activities: activities.length > 0 ? activities : ["No especificadas"],
        diseases: diseases.trim() || "No especificadas",
        profileImage,
      };

      await setDoc(doc(db, "users", user.uid), userData);

      Alert.alert("¡Éxito!", "¡Cuenta creada exitosamente!");
      router.push("../screens/screenMain");
    } catch (error) {
      console.error("Error en la creación de cuenta:", error.message);
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
        <TouchableOpacity onPress={handleImagePick} className="mb-4">
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

        {/* Campos de entrada */}
        <View className="space-y-4 w-full items-center">
          <TextInput
            className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4 border-[1px] border-[#3CC4B9]"
            placeholder="Nombre"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4 border-[1px] border-[#3CC4B9]"
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4 border-[1px] border-[#3CC4B9]"
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4 border-[1px] border-[#3CC4B9]"
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            className="flex h-[56px] w-[90%] bg-[#f1f1f1] rounded-full px-4 border-[1px] border-[#3CC4B9]"
            placeholder="Enfermedades (opcional)"
            placeholderTextColor="#888"
            value={diseases}
            onChangeText={setDiseases}
          />
        </View>

        {/* Selector de dieta */}
        <View className="w-full mt-6 pt-6">
          <Text className="text-center text-lg font-bold">Selecciona tu dieta</Text>
          <View className="flex-row flex-wrap justify-center mt-4">
            {dietOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleSelectDiet(option)}
                className={`px-4 py-2 rounded-full m-1 ${
                  diet === option ? "bg-[#3CC4B9]" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-sm ${
                    diet === option ? "text-white" : "text-gray-700"
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selector de actividades */}
        <View className="w-full mt-6 pt-6">
          <Text className="text-center text-lg font-bold">
            Selecciona tus actividades
          </Text>
          <View className="flex-row flex-wrap justify-center mt-4">
            {activityOptions.map(({ name, icon }) => (
              <TouchableOpacity
                key={name}
                onPress={() => handleSelectActivity(name)}
                className={`px-4 py-2 rounded-full m-1 flex-row justify-between items-center ${
                  activities.includes(name) ? "bg-[#3CC4B9]" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-sm ${
                    activities.includes(name) ? "text-white" : "text-gray-700"
                  }`}
                >
                  {name}
                </Text>
                <MaterialCommunityIcons
                  name={icon}
                  size={20}
                  color={activities.includes(name) ? "white" : "gray"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botón de registro */}
        <TouchableOpacity
          className="flex mb-12 h-[56px] w-[90%] bg-[#3CC4B9] rounded-full mt-10 justify-center items-center"
          onPress={handleCreateAccount}
        >
          <Text className="text-[#FFFFFF] text-[16px]">Crear Cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenRegister;
