import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import * as ImagePicker from 'expo-image-picker'; // Importa Image Picker
import { Picker } from '@react-native-picker/picker'; // Combobox de selección

const ScreenEditUser = () => {
  // Estados iniciales para manejar datos del usuario
  const [userData, setUserData] = useState({
    profilePicture: 'https://via.placeholder.com/100', // URL de foto de perfil
    email: 'user@example.com', // Este será fijo
    username: 'stiven_castillo', // Modificable cada 3 meses
    description: '',
    goal: '',
    diseases: '',
    weight: '',
    height: '',
    diet: 'None', // Vegetariano, Carnívoro, etc.
    activities: ['bicycle', 'run', 'weightlifting'], // Lista de actividades físicas
  });

  const [showDietPicker, setShowDietPicker] = useState(false); // Controla la visibilidad del Combobox

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData({ ...userData, profilePicture: result.uri });
    } else {
      Alert.alert('Error', 'No se seleccionó ninguna imagen.');
    }
  };

  const activityIcons = {
    bicycle: <MaterialCommunityIcons name="bike" size={30} color="#388E3C" />,
    run: <MaterialCommunityIcons name="run" size={30} color="#388E3C" />,
    weightlifting: <MaterialCommunityIcons name="weight-lifter" size={30} color="#388E3C" />,
  };

  return (
    <View className="flex-1 bg-[#E8F5E9] relative">
      {/* Contenido desplazable */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1"
      >
        {/* Animación de entrada */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'spring', duration: 800, damping: 15 }}
          className="px-4 pt-8"
        >
          {/* Foto de perfil */}
          <View className="items-center">
            <TouchableOpacity onPress={handleProfilePicture} className="relative">
              <Ionicons
                name="camera"
                size={24}
                color="white"
                className="absolute bottom-0 right-0 bg-[#388E3C] p-2 rounded-full shadow-md"
              />
              <View className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <Image
                  source={{ uri: userData.profilePicture }}
                  className="w-full h-full"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-lg font-bold text-gray-800 mt-4">Edit Profile</Text>
          </View>

          {/* Campos de edición */}
          <View className="mt-6 space-y-4">
            {/* Username */}
            <TextInput
              value={userData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              placeholder="Username"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />

            {/* Description */}
            <TextInput
              value={userData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Description"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />

            {/* Goal */}
            <TextInput
              value={userData.goal}
              onChangeText={(value) => handleInputChange('goal', value)}
              placeholder="Goal"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />

            {/* Diseases */}
            <TextInput
              value={userData.diseases}
              onChangeText={(value) => handleInputChange('diseases', value)}
              placeholder="Diseases"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />

            {/* Weight */}
            <TextInput
              value={userData.weight}
              onChangeText={(value) => handleInputChange('weight', value)}
              placeholder="Weight (kg)"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />

            {/* Height */}
            <TextInput
              value={userData.height}
              onChangeText={(value) => handleInputChange('height', value)}
              placeholder="Height (cm)"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />

            {/* Diet Combobox */}
            <TouchableOpacity
              onPress={() => setShowDietPicker(!showDietPicker)}
              className="border border-gray-300 rounded-lg p-4 text-gray-600 bg-white shadow-md"
            >
              <Text className="text-gray-600">
                Diet: {userData.diet === 'None' ? 'Select Diet' : userData.diet}
              </Text>
            </TouchableOpacity>

            {showDietPicker && (
              <MotiView
                from={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 500 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Picker
                  selectedValue={userData.diet}
                  onValueChange={(value) => {
                    handleInputChange('diet', value);
                    setShowDietPicker(false);
                  }}
                >
                  <Picker.Item label="Vegetarian" value="Vegetarian" />
                  <Picker.Item label="Carnivore" value="Carnivore" />
                  <Picker.Item label="None" value="None" />
                </Picker>
              </MotiView>
            )}
          </View>

          {/* Actividades */}
          <View className="mt-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Your Activities</Text>
            <View className="flex-row justify-between px-4">
              {userData.activities.map((activity, index) => (
                <View key={index} className="items-center">
                  {activityIcons[activity] || (
                    <MaterialCommunityIcons
                      name="help-circle-outline"
                      size={30}
                      color="gray"
                    />
                  )}
                  <Text className="text-sm text-gray-600 mt-2 capitalize">{activity}</Text>
                </View>
              ))}
            </View>
          </View>
        </MotiView>
      </ScrollView>

      {/* Botón flotante para guardar */}
      <TouchableOpacity
        onPress={() => Alert.alert('Changes Saved!')}
        className="absolute bottom-6 right-6 bg-[#388E3C] p-4 rounded-full shadow-lg"
      >
        <Ionicons name="save" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenEditUser;
