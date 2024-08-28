import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

const ScreenProfile = ({
  avatar = require('../../assets/images/favicon.png'),
  name = '',
  username = '',
  email = '',
  age = '',
  weight = '',
  height = '',
  goal = '',
  illnesses = '',
}) => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const [editableName, setEditableName] = useState(name);
  const [editableAge, setEditableAge] = useState(age);
  const [editableWeight, setEditableWeight] = useState(weight);
  const [editableHeight, setEditableHeight] = useState(height);
  const [editableGoal, setEditableGoal] = useState(goal);
  const [editableIllnesses, setEditableIllnesses] = useState(illnesses);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAvatar({ uri: result.uri });
    }
  };

  return (
    <Animated.View 
      className="pt-12"
      entering={FadeInDown.delay(100).springify()} 
      style={{ flex: 1, backgroundColor: '#ffffff' }}
    >
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex flex-row justify-between items-center px-4 mt-4">
        <TouchableOpacity onPress={() => router.back()} >
          <Feather name="arrow-left" size={24} color="#388E3C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('../screens/EditProfile')}>
          <Feather name="edit" size={24} color="#388E3C" />
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <ScrollView>
        <View className="flex items-center mt-6">
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={selectedAvatar}
              style={{ width: 100, height: 100, borderRadius: 50 }}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TextInput
            className="mt-4 w-[80%] h-[40px] bg-[#f1f1f1] rounded-lg px-4 text-center"
            placeholder="Nombre"
            value={editableName}
            onChangeText={setEditableName}
          />

          <Text className="text-gray-500 mt-2">Usuario: {username}</Text>
          <Text className="text-gray-500">Correo: {email}</Text>

          {/* Age Selector */}
          <Text className="mt-4">Edad:</Text>
          <TextInput
            className="w-[80%] h-[40px] bg-[#f1f1f1] rounded-lg px-4 text-center"
            placeholder="Edad"
            value={editableAge}
            onChangeText={setEditableAge}
            keyboardType="numeric"
            maxLength={2}
          />

          {/* Weight and Height */}
          <View className="flex flex-row justify-between w-[80%] mt-4">
            <TextInput
              className="w-[48%] h-[40px] bg-[#f1f1f1] rounded-lg px-4 text-center"
              placeholder="Peso (kg)"
              value={editableWeight}
              onChangeText={setEditableWeight}
              keyboardType="numeric"
            />
            <TextInput
              className="w-[48%] h-[40px] bg-[#f1f1f1] rounded-lg px-4 text-center"
              placeholder="Estatura (cm)"
              value={editableHeight}
              onChangeText={setEditableHeight}
              keyboardType="numeric"
            />
          </View>

          {/* Goal */}
          <Text className="mt-4">Objetivo:</Text>
          <TextInput
            className="w-[80%] h-[80px] bg-[#f1f1f1] rounded-lg px-4 text-center"
            placeholder="Escribe tu objetivo (max 150 caracteres)"
            value={editableGoal}
            onChangeText={setEditableGoal}
            multiline
            maxLength={150}
          />

          {/* Illnesses */}
          <Text className="mt-4">Enfermedades:</Text>
          <TextInput
            className="w-[80%] h-[40px] bg-[#f1f1f1] rounded-lg px-4 text-center"
            placeholder="Escribe tus enfermedades"
            value={editableIllnesses}
            onChangeText={setEditableIllnesses}
          />

        </View>

        {/* Footer Carousel */}
        <View className="mt-8 mx-12">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
            {/* Ejemplo de imágenes */}
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} className="mr-2">
                <Image source={require('../../assets/images/favicon.png')} style={{ width: wp(90), height: 200 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default ScreenProfile;
