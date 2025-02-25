import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../../firebase-config";
import { MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { MotiView } from "moti";

const ScreenProfile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  // Iconos para actividades
  const activityIcons = {
    Yoga: "self-improvement",
    Correr: "directions-run",
    Natación: "pool",
    Fútbol: "sports-soccer",
    Ciclismo: "pedal-bike",
    Tenis: "sports-tennis",
    Gimnasio: "fitness-center",
    Voleibol: "sports-volleyball",
    Senderismo: "hiking",
    Patinaje: "roller-skating",
    Esquí: "ac-unit",
  };

  // Cargar datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            Alert.alert("Error", "No se encontraron datos del usuario.");
          }
        } else {
          Alert.alert("Error", "No estás autenticado.");
          router.replace("../screens/screenLogin");
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error.message);
        Alert.alert("Error", "Hubo un problema al cargar tu perfil.");
      }
    };

    fetchUserData();
  }, []);

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has salido de tu cuenta correctamente.");
      router.replace("../screens/screenLogin");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      Alert.alert("Error", "No se pudo cerrar sesión. Intenta nuevamente.");
    }
  };

  return (
    <View className="flex-1 bg-white/40">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Encabezado */}
        <View className="bg-[#3CC4B9] h-48 w-full rounded-b-[12px] items-center justify-end relative">
          
        {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push("../screens/screenMain")}
            className="absolute top-10 left-4 bg-white p-3 rounded-full shadow-md"
          >
            <MaterialIcons name="arrow-back" size={24} color="#3CC4B9" />
          </TouchableOpacity>

        {/* Edit User Button */}
          <TouchableOpacity
            onPress={() => router.push("../screens/screenEditUser")}
            className="absolute top-10 right-4 bg-white p-3 rounded-full shadow-md"
          >
            <MaterialIcons name="edit" size={24} color="#3CC4B9" />
          </TouchableOpacity>

         {/* Imagen */} 
          <View className="mb-[-30px] items-center">
            <Image
              source={{ uri: userData?.profileImage || "https://via.placeholder.com/100" }}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
          </View>
        </View>

        {/* Información del usuario */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "timing", duration: 500 }}
          className="px-4 mt-6 pt-2 "
        >
          <Text className="text-center text-xl font-bold text-gray-800">
            {userData?.fullName || "Usuario"}
          </Text>
          <Text className="text-center text-sm text-gray-500">
            @{userData?.email || "email@example.com"}
          </Text>

          {/* About */}
          <View className="mt-8">
            <Text className="text-lg font-bold text-gray-800">Objetivo</Text>
            <Text className="text-sm text-gray-600 mt-2">
              {userData?.objective || "Sin objetivo especificado."}
            </Text>
          </View>

          {/* Dieta */}
          <View className="mt-8">
            <Text className="text-lg font-bold text-gray-800">Dieta</Text>
            <Text className="text-sm text-gray-600 mt-2">
              {userData?.diet || "Sin dieta especificada."}
            </Text>
          </View>

          {/* Sección de intereses */}
          <View className="mt-8">
            <Text className="text-lg font-bold text-gray-800">Actividades</Text>
            <View className="flex-row flex-wrap mt-4">
              {userData?.activities?.map((activity, index) => (
                <View
                  key={index}
                  className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2 flex-row items-center border-[1px] border-[#3CC4B9]"
                >
                  <MaterialIcons
                    name={activityIcons[activity] || "check"}
                    size={16}
                    color="#3CC4B9"
                  />
                  <Text className="ml-2 text-sm text-gray-600">{activity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Enfermedades */}
          <View className="mt-8">
            <Text className="text-lg font-bold text-gray-800">Enfermedades</Text>
            <Text className="text-sm text-gray-600 mt-2">
              {userData?.diseases || "Sin enfermedades registradas."}
            </Text>
          </View>

          {/* Configuración y Cerrar Sesión */}
          <View className="mt-8">
            <TouchableOpacity
              className="flex-row items-center justify-between bg-white rounded-lg px-4 py-3 mb-4 shadow-md"
              onPress={() => router.push("../screens/screenSettings")}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="settings" size={24} color="#3CC4B9" />
                <Text className="ml-4 text-base font-bold text-gray-800">
                  Configuración
                </Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#3CC4B9" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-between bg-white rounded-lg px-4 py-3 shadow-md"
              onPress={handleLogout}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="logout" size={24} color="red" />
                <Text className="ml-4 text-base font-bold text-red-600">Cerrar Sesión</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
};

export default ScreenProfile;
