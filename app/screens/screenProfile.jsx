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
import { ActivityIndicator } from "react-native";
import activityService from "../services/ActivityService";
import CustomAlert from "../../app/components/customAlert"; 

const ScreenProfile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const [alert, setAlert] = useState({ visible: false, type: "", title: "", message: "" }); // ✅ Estado del Alert

  // ✅ Función para mostrar alertas con CustomAlert
  const showAlert = (type, title, message) => {
    setAlert({ visible: true, type, title, message });
  };

  // ✅ Función para cerrar alertas
  const handleAlertClose = () => {
    setAlert({ visible: false });
  };

  // Cargar datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      // Si ya hay datos, no volver a cargarlos
      if (userData) {
        setIsLoading(false); 
        return;
      }
  
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Guardar datos en el estado
          } else {
            showAlert("error", "Error", "No se encontraron datos del usuario."); 
          }
        } else {
          showAlert("error", "Error", "No estás autenticado.");
          router.replace("../screens/screenLogin");
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error.message);
        showAlert("error", "Error", "Hubo un problema al cargar tu perfil.");
      } finally {
        setTimeout(() => setIsLoading(false), 2000); // Esperamos 2 segundos antes de ocultar el loading
      }
    };
  
    fetchUserData();
  }, []);

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      showAlert("success", "Sesión cerrada", "Has salido de tu cuenta correctamente.")

      setTimeout(() => {
        handleAlertClose() // Cierra el alerta antes de redirigir
        router.replace("../screens/screenLogin");
      },700); // Espera 1 segundos para permitir que el alerta sea visible
      
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      showAlert("error", "Error", "No se pudo cerrar sesión. Intenta nuevamente.")
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3CC4B9" />
        <Text className="mt-4 text-gray-600">Cargando perfil...</Text>
      </View>
    );
  }
  

  return (
    <View className="flex-1 bg-white/40">
      {/* ✅ CustomAlert siempre visible en la pantalla */}
      <CustomAlert visible={alert.visible} type={alert.type} title={alert.title} message={alert.message} onClose={handleAlertClose} />

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
            {userData?.email || "email@example.com"}
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
                    name={activityService.getActivityIcon(activity)}
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
