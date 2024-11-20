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
import { MotiView, AnimatePresence } from 'moti';
import * as ImagePicker from 'expo-image-picker';

const ScreenEditUser = ({ navigation }) => {
  const [userData, setUserData] = useState({
    profilePicture: 'https://via.placeholder.com/100',
    email: 'user@example.com',
    username: 'stiven_castillo',
    description: '',
    goal: '',
    diseases: '',
    weight: '',
    height: '',
    diet: 'None',
    activities: ['bicycle', 'run', 'weightlifting'],
  });

  const [showDietPicker, setShowDietPicker] = useState(false);

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
    <View className="flex-1 bg-[#F5F7FA] relative">
      {/* Botón de regresar */}
      <TouchableOpacity
        onPress={() => navigation && navigation.goBack()}
        className="absolute top-10 left-4 bg-white p-2 rounded-full shadow-md"
      >
        <Ionicons name="arrow-back" size={24} color="#388E3C" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1">
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'spring', duration: 800, damping: 15 }}
          className="px-4 pt-16"
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
            <TextInput
              value={userData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              placeholder="Username"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />
            <TextInput
              value={userData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Description"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />
            <TextInput
              value={userData.goal}
              onChangeText={(value) => handleInputChange('goal', value)}
              placeholder="Goal"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />
            <TextInput
              value={userData.diseases}
              onChangeText={(value) => handleInputChange('diseases', value)}
              placeholder="Diseases"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />
            <TextInput
              value={userData.weight}
              onChangeText={(value) => handleInputChange('weight', value)}
              placeholder="Weight (kg)"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />
            <TextInput
              value={userData.height}
              onChangeText={(value) => handleInputChange('height', value)}
              placeholder="Height (cm)"
              className="border border-gray-300 rounded-lg p-4 text-gray-600"
            />

            {/* Diet Combobox */}
            <TouchableOpacity
              onPress={() => setShowDietPicker(!showDietPicker)}
              className="border border-gray-300 rounded-lg p-4 text-gray-600 bg-white shadow-md flex-row justify-between items-center"
            >
              <Text className="text-gray-600">
                Diet: {userData.diet === 'None' ? 'Select Diet' : userData.diet}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#388E3C" />
            </TouchableOpacity>

            <AnimatePresence>
              {showDietPicker && (
                <MotiView
                  from={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', duration: 400 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {['Vegetarian', 'Carnivore', 'None'].map((diet) => (
                    <TouchableOpacity
                      key={diet}
                      onPress={() => {
                        handleInputChange('diet', diet);
                        setShowDietPicker(false);
                      }}
                      className="p-4 border-b border-gray-300"
                    >
                      <Text className="text-gray-600">{diet}</Text>
                    </TouchableOpacity>
                  ))}
                </MotiView>
              )}
            </AnimatePresence>
          </View>

          {/* Actividades */}
          <MotiView
            from={{ translateY: showDietPicker ? 10 : 0 }}
            animate={{ translateY: showDietPicker ? 50 : 0 }}
            transition={{ type: 'spring', duration: 400 }}
            className="mt-6"
          >
            <Text className="text-lg font-bold text-gray-800 mb-4">Your Activities</Text>
            <View className="flex-row justify-between px-4">
              {userData.activities.map((activity, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="items-center"
                >
                  {activityIcons[activity] || (
                    <MaterialCommunityIcons
                      name="help-circle-outline"
                      size={30}
                      color="gray"
                    />
                  )}
                  <Text className="text-sm text-gray-600 mt-2 capitalize">{activity}</Text>
                </MotiView>
              ))}
            </View>
          </MotiView>
        </MotiView>
      </ScrollView>

      {/* Botón flotante para guardar */}
      <TouchableOpacity
        onPress={() => Alert.alert('Changes Saved!')}
        className="absolute bottom-0 right-0 bg-[#388E3C] w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
        style={{ marginBottom: -8, marginRight: -8 }}
      >
        <Ionicons name="save" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenEditUser;
