import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config';
import { Ionicons } from '@expo/vector-icons';

const nutrientEmojis = {
  calories: '🔥',
  fat: '🥓',
  saturated_fat: '🥩',
  sugars: '🍬',
  salt: '🧂',
  fiber: '🌾',
  proteins: '🍗',
  carbohydrates: '🍞',
};

const healthIndicators = [
  { label: 'Saludable', emoji: '✅', threshold: 3 },
  { label: 'Medianamente Saludable', emoji: '⚠️', threshold: 6 },
  { label: 'No Saludable', emoji: '❌', threshold: 10 },
];

const getHealthRating = (nutrientValues) => {
  const totalPoints = Object.values(nutrientValues).reduce((acc, value) => acc + value, 0);
  if (totalPoints <= 3) return healthIndicators[0];
  if (totalPoints <= 6) return healthIndicators[1];
  return healthIndicators[2];
};

const ScreenProductDetail = () => {
  const { product } = useLocalSearchParams();
  const productData = JSON.parse(product);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) setUserData(userDoc.data());
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const nutrientValues = {
    calories: productData.nutriments['energy-kcal'] ? parseFloat(productData.nutriments['energy-kcal']) / 100 : 0,
    fat: productData.nutriments.fat ? parseFloat(productData.nutriments.fat) / 100 : 0,
    saturated_fat: productData.nutriments['saturated-fat'] ? parseFloat(productData.nutriments['saturated-fat']) / 100 : 0,
    sugars: productData.nutriments.sugars ? parseFloat(productData.nutriments.sugars) / 100 : 0,
    salt: productData.nutriments.salt ? parseFloat(productData.nutriments.salt) / 100 : 0,
    fiber: productData.nutriments.fiber ? parseFloat(productData.nutriments.fiber) / 100 : 0,
    proteins: productData.nutriments.proteins ? parseFloat(productData.nutriments.proteins) / 100 : 0,
    carbohydrates: productData.nutriments.carbohydrates ? parseFloat(productData.nutriments.carbohydrates) / 100 : 0,
  };

  const healthRating = getHealthRating(nutrientValues);
  const isVegetarian = productData.labels_tags?.includes('vegetarian') ? 'Sí' : 'No';

  return (
    <ScrollView className="flex-1 bg-[#F5F7FA]">
      {loading ? (
        <View className="flex-1 justify-center items-center py-10">
          <ActivityIndicator size="large" color="#3CC4B9" />
          <Text className="text-gray-600 mt-4">Cargando detalles...</Text>
        </View>
      ) : (
        <View>
          {/* Banner y Imagen */}
          <View className="bg-[#3CC4B9] h-48 rounded-b-3xl relative justify-center items-center">
            <Image
              source={{ uri: productData.image_front_url || 'https://via.placeholder.com/150' }}
              className="w-40 h-40 rounded-xl absolute -bottom-20 z-10 border-4 border-white"
              style={{ resizeMode: 'contain' }}
            />
          </View>

          {/* Información Detallada */}
          <View className="bg-white mt-20 rounded-t-3xl p-6">
            <Text className="text-2xl font-bold text-gray-800 mb-2">{productData.product_name || 'Producto Desconocido'}</Text>
            <Text className="text-gray-500 text-sm mb-4">{productData.ingredients_text || 'Ingredientes no disponibles.'}</Text>

            {/* Salud del Producto */}
            <View className="mt-4">
              <Text className="text-lg font-semibold text-gray-700 mb-2">Calificación de Salud</Text>
              <View className="flex-row justify-between items-center bg-gray-100 p-3 rounded-lg">
                <Text className="text-xl font-bold">{healthRating.emoji}</Text>
                <Text className="text-gray-700 font-medium">{healthRating.label}</Text>
              </View>
            </View>

            {/* Apto para el Usuario */}
            <View className="mt-6">
              <Text className="text-lg font-semibold text-gray-700 mb-2">¿Apto para ti?</Text>
              <View className="flex-row justify-between items-center bg-gray-100 p-3 rounded-lg">
                {userData ? (
                  <Text className="text-gray-700 font-medium">
                    {userData.diet && userData.diet !== 'No especificado' ? `Dieta: ${userData.diet}` : 'Sin dieta especificada.'}
                  </Text>
                ) : (
                  <Text className="text-red-500 font-medium">Inicia sesión para más información.</Text>
                )}
              </View>
            </View>

            {/* Información Nutricional */}
            <View className="mt-6">
              <Text className="text-lg font-semibold text-gray-700 mb-4">Información Nutricional (por 100g)</Text>
              {Object.entries(nutrientValues).map(([key, value]) => (
                <View key={key} className="flex-row justify-between items-center mb-2 bg-gray-100 p-3 rounded-lg">
                  <Text className="text-2xl">{nutrientEmojis[key]}</Text>
                  <Text className="text-gray-700 font-medium">{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value.toFixed(2)}g`}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ScreenProductDetail;
