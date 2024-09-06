import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Carousel from 'react-native-reanimated-carousel';

const ScreenProfile = ({
  avatar = require('../../assets/images/favicon.png'),
  name = 'Nombre de ejemplo',
  username = 'Usuario de ejemplo',
  email = 'email@ejemplo.com',
  age = '28 Años',
  weight = '89 kg',
  height = '170 cm',
  goal = 'Ganar Masa Muscular',
  illnesses = 'No Registra Enfermedades',
}) => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  

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

  const carouselItems = [
    { title: 'Noticia 1', image: require('../../assets/images/favicon.png') },
    { title: 'Noticia 2', image: require('../../assets/images/favicon.png') },
    { title: 'Noticia 3', image: require('../../assets/images/favicon.png') },
  ];

  return (
    <Animated.View 
      entering={FadeInDown.delay(100).springify()} 
      style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: 40 }}
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
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={selectedAvatar}
            style={{ width: 100, height: 100, borderRadius: 50, marginTop: 16 }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <TextInput
          className="rounded-full"
          style={{ marginTop: 16, width: '80%', height: 40, backgroundColor: '#f1f1f1', paddingHorizontal: 16, textAlign: 'center', color: '#000000' }}
          placeholder="Nombre"
          value={name}
          editable={false}
          placeholderTextColor="#888"
        />

        <Text style={{ color: '#888', marginTop: 8 }}>Usuario: {username}</Text>
        <Text style={{ color: '#888' }}> Correo: {email}</Text>

        {/* Age Selector */}
        <Text style={{ marginTop: 16 }}>Edad:</Text>
        <TextInput
          className="rounded-full"
          style={{ width: '80%', height: 40, backgroundColor: '#f1f1f1', paddingHorizontal: 16, textAlign: 'center', color: '#000000' }}
          placeholder="Edad"
          value={age}
          editable={false}
          placeholderTextColor="#888"
        />

        {/* Weight and Height */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 16 }}>
          <View 
            className="space-y-2"
            style={{ width: '48%' }}>
            <Text 
            className="text-center">Peso (kg):</Text>
            <TextInput
              className="rounded-full"
              style={{ width: '100%', height: 40, backgroundColor: '#f1f1f1', borderRadius: 8, paddingHorizontal: 16, textAlign: 'center', color: '#000000' }}
              placeholder="Peso (kg)"
              value={weight}
              editable={false}
              placeholderTextColor="#888"
            />
          </View>
          <View 
            className="space-y-2"
            style={{ width: '48%' }}>
            <Text 
               className="text-center">Estatura (cm):</Text>
            <TextInput
              className="rounded-full"
              style={{ width: '100%', height: 40, backgroundColor: '#f1f1f1', paddingHorizontal: 16, textAlign: 'center', color: '#000000' }}
              placeholder="Estatura (cm)"
              value={height}
              editable={false}
              placeholderTextColor="#888"
            />
          </View>
        </View>

        {/* Goal */}
        <Text style={{ marginTop: 16 }}>Objetivo:</Text>
        <TextInput
          style={{ width: '80%', height: 80, backgroundColor: '#f1f1f1', borderRadius: 8, paddingHorizontal: 16, textAlign: 'center', textAlignVertical: 'center', color: '#000000' }}
          placeholder="Escribe tu objetivo (max 150 caracteres)"
          value={goal}
          editable={false}
          multiline
          placeholderTextColor="#888"
        />

        {/* Illnesses */}
        <Text style={{ marginTop: 16 }}>Enfermedades:</Text>
        <TextInput
          style={{ width: '80%', height: 40, backgroundColor: '#f1f1f1', borderRadius: 8, paddingHorizontal: 16, textAlign: 'center', color: '#000000' }}
          placeholder="Escribe tus enfermedades"
          value={illnesses}
          editable={false}
          placeholderTextColor="#888"
        />

        {/* Footer Carousel */}
        <View style={{ marginTop: 32, width: '90%' }}>
          <Carousel
            width={wp(90)}
            height={200}
            data={carouselItems}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 10 }}>
                <Image source={item.image} style={{ width: '100%', height: 160, borderRadius: 8 }} />
                <Text style={{ color: '#388E3C', textAlign: 'center', marginTop: 5 }}>{item.title}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default ScreenProfile;
