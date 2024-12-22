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
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../../firebase-config";
import { useRouter } from "expo-router";

const ScreenRegister = () => {
  const router = useRouter();

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [objective, setObjective] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [diet, setDiet] = useState("");
  const [conditions, setConditions] = useState("");
  const [diseases, setDiseases] = useState("");
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Opciones
  const genderOptions = ["Masculino", "Femenino", "Otro"];
  const activityLevels = ["Bajo", "Moderado", "Alto"];
  const dietOptions = [
    "Carnívoro",
    "Vegetariano",
    "Vegano",
    "Pescetariano",
    "Sin Restricciones",
    "Otro",
  ];
  const activityOptions = [
    "Yoga",
    "Correr",
    "Natación",
    "Fútbol",
    "Ciclismo",
    "Gimnasio",
  ];

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
      Alert.alert("Error", "No se pudo seleccionar la imagen.");
    }
  };

  // Registro de usuario
  const handleCreateAccount = async () => {
    setIsLoading(true);

    if (!email || !password || !confirmPassword || !fullName || !age || !weight || !height || !gender || !objective) {
      setIsLoading(false);
      Alert.alert("Error", "Todos los campos obligatorios deben ser completados.");
      return;
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Datos del usuario
      const userData = {
        email,
        fullName,
        profileImage,
        objective,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        gender,
        activityLevel,
        diet,
        conditions: conditions || "No especificado",
        diseases: diseases || "No especificado",
        activities: activities.length > 0 ? activities : ["No especificadas"],
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

      // Guardar en Firestore
      await setDoc(doc(db, "users", user.uid), userData);

      Alert.alert("Éxito", "Cuenta creada exitosamente.");
      router.push("../screens/screenMain");
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la cuenta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 50,
        }}
      >
        <StatusBar style="light" />

        {isLoading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <ActivityIndicator size="large" color="#3CC4B9" />
            <Text style={{ marginTop: 10, color: "#fff" }}>Registrando...</Text>
          </View>
        )}

        {/* Imagen de perfil */}
        <TouchableOpacity onPress={handleImagePick}>
          <Image
            source={{ uri: profileImage }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "#3CC4B9",
              marginBottom: 20,
            }}
          />
          <Text style={{ color: "#3CC4B9" }}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        {/* Campos del formulario */}
        <TextInput
          placeholder="Nombre completo"
          value={fullName}
          onChangeText={setFullName}
          style={{
            borderBottomWidth: 1,
            borderColor: "#ccc",
            marginBottom: 20,
            width: "100%",
            padding: 10,
          }}
        />
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{
            borderBottomWidth: 1,
            borderColor: "#ccc",
            marginBottom: 20,
            width: "100%",
            padding: 10,
          }}
        />
        <TextInput
          placeholder="Edad"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={{
            borderBottomWidth: 1,
            borderColor: "#ccc",
            marginBottom: 20,
            width: "100%",
            padding: 10,
          }}
        />
        <TextInput
          placeholder="Altura (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          style={{
            borderBottomWidth: 1,
            borderColor: "#ccc",
            marginBottom: 20,
            width: "100%",
            padding: 10,
          }}
        />
        <TextInput
          placeholder="Peso (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={{
            borderBottomWidth: 1,
            borderColor: "#ccc",
            marginBottom: 20,
            width: "100%",
            padding: 10,
          }}
        />
        <TouchableOpacity
          onPress={handleCreateAccount}
          style={{
            backgroundColor: "#3CC4B9",
            paddingVertical: 15,
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Crear Cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenRegister;
