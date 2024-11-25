import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons'; // Iconos actualizados
import { useRouter } from 'expo-router'; // Manejo de navegación
import { MotiView } from 'moti';
import BottomNavBar from './BottomNavBar'; // Componente NavBar
import { auth } from '../../firebase-config'; // Firebase auth para obtener instancia
import { signOut } from 'firebase/auth'; // Importa signOut directamente desde Firebase

const ScreenProfile = () => {
  const router = useRouter();
  const userEmail = auth.currentUser?.email || 'email@example.com'; // Recupera el correo de Firebase

  // Función para manejar el logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Llama a signOut con el objeto auth
      console.log('Sesión cerrada exitosamente');
      Alert.alert('Sesión cerrada', 'Has salido de tu cuenta correctamente.');
      router.replace('../screens/screenLogin'); // Redirige al inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo nuevamente.');
    }
  };

  // Redirigir al usuario si no está autenticado
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace('../screens/screenLogin');
      }
    });
    return unsubscribe; // Limpia el listener cuando el componente se desmonta
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1">
        {/* Encabezado */}
        <View className="bg-gradient-to-r from-blue-400 to-purple-500 h-48 w-full rounded-b-xl items-center justify-end relative">
          <TouchableOpacity
            onPress={() => router.push('../screens/screenMain')}
            className="absolute top-10 left-4 bg-white p-3 rounded-full shadow-md"
          >
            <MaterialIcons name="arrow-back" size={24} color="#388E3C" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('../screens/screenEditUser')}
            className="absolute top-10 right-4 bg-[#388E3C] p-3 rounded-full shadow-md"
          >
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>

          <View className="mb-[-30px] items-center">
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-[#388E3C] w-6 h-6 rounded-full flex items-center justify-center"
              onPress={() => router.push('../screens/screenEditUser')}
            >
              <MaterialIcons name="add" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500 }}
          className="px-4 mt-6 pt-2"
        >
          <Text className="text-center text-xl font-bold text-gray-800">Monica Miller</Text>
          <Text className="text-center text-sm text-gray-500">@{userEmail}</Text>

          {/* Contenedores de Followers y Following */}
          <View className="flex-row justify-center space-x-4 mt-6">
            <View className="bg-white rounded-lg shadow-md px-6 py-4 items-center">
              <Text className="text-xl font-bold text-gray-800">888k</Text>
              <Text className="text-sm text-gray-500">Followers</Text>
            </View>
            <View className="bg-white rounded-lg shadow-md px-6 py-4 items-center">
              <Text className="text-xl font-bold text-gray-800">204k</Text>
              <Text className="text-sm text-gray-500">Following</Text>
            </View>
          </View>

          {/* Sección About */}
          <View className="mt-8">
            <Text className="text-lg font-bold text-gray-800">About</Text>
            <Text className="text-sm text-gray-600 mt-2">
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum has been the when an unknown printer took a galley...
            </Text>
          </View>

          {/* Sección Interests */}
          <View className="mt-8">
            <Text className="text-lg font-bold text-gray-800">Interests</Text>
            <View className="flex-row flex-wrap mt-4">
              <View className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2 flex-row items-center">
                <Feather name="coffee" size={16} color="#388E3C" />
                <Text className="ml-2 text-sm text-gray-600">Foodie</Text>
              </View>
              <View className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2 flex-row items-center">
                <MaterialIcons name="self-improvement" size={16} color="#388E3C" />
                <Text className="ml-2 text-sm text-gray-600">Yoga</Text>
              </View>
              <View className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2 flex-row items-center">
                <MaterialIcons name="brush" size={16} color="#388E3C" />
                <Text className="ml-2 text-sm text-gray-600">Painting</Text>
              </View>
              <View className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2 flex-row items-center">
                <Feather name="map-pin" size={16} color="#388E3C" />
                <Text className="ml-2 text-sm text-gray-600">Traveller</Text>
              </View>
              <View className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2 flex-row items-center">
                <MaterialIcons name="music-note" size={16} color="#388E3C" />
                <Text className="ml-2 text-sm text-gray-600">Music</Text>
              </View>
            </View>
          </View>

          {/* Sección Configuración y Cerrar Sesión */}
          <View className="mt-8">
            <TouchableOpacity
              className="flex-row items-center justify-between bg-white rounded-lg px-4 py-3 mb-4 shadow-md"
              onPress={() => router.push('../screens/screenSettings')}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="settings" size={24} color="#388E3C" />
                <Text className="ml-4 text-base font-bold text-gray-800">Settings</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#388E3C" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-between bg-white rounded-lg px-4 py-3 shadow-md"
              onPress={handleLogout}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="logout" size={24} color="red" />
                <Text className="ml-4 text-base font-bold text-red-600">Log Out</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </MotiView>
      </ScrollView>

      {/* Footer NavBar fijo */}
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavBar />
      </View>
    </View>
  );
};

export default ScreenProfile;
