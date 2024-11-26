import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

const postsData = [
  {
    id: 1,
    userImage: 'https://via.placeholder.com/100',
    userName: 'Alice Brown',
    userGoal: 'Perder peso',
    description: 'Comparación de alimentos bajos en carbohidratos.',
    bgColor: 'bg-green-500',
    likes: 12,
    saved: 5,
  },
  {
    id: 2,
    userImage: 'https://via.placeholder.com/100',
    userName: 'John Doe',
    userGoal: 'Ganancia muscular',
    description: 'Receta alta en proteínas recomendada.',
    bgColor: 'bg-orange-500',
    likes: 20,
    saved: 8,
  },
  {
    id: 3,
    userImage: 'https://via.placeholder.com/100',
    userName: 'Sophia Smith',
    userGoal: 'Dieta vegana',
    description: 'Revisión de alimentos veganos ricos en hierro.',
    bgColor: 'bg-blue-500',
    likes: 35,
    saved: 12,
  },
  {
    id: 4,
    userImage: 'https://via.placeholder.com/100',
    userName: 'Emma Johnson',
    userGoal: 'Mejorar salud cardiovascular',
    description: 'Selección de alimentos bajos en sodio.',
    bgColor: 'bg-purple-500',
    likes: 50,
    saved: 18,
  },
];

const popularRecipes = [
  {
    id: 1,
    title: 'Receta 1',
    icon: 'fast-food-outline',
    bgColor: 'bg-pink-500',
    days: '7 días',
  },
  {
    id: 2,
    title: 'Receta 2',
    icon: 'nutrition-outline',
    bgColor: 'bg-blue-500',
    days: '2 días',
  },
  {
    id: 3,
    title: 'Receta 3',
    icon: 'restaurant-outline',
    bgColor: 'bg-yellow-500',
    days: '1 día',
  },
];

const ScreenPosts = () => {
  const router = useRouter();
  const [posts, setPosts] = useState(postsData);

  const handlePostClick = (postId) => {
    router.push(`../screens/screenPostDetail?id=${postId}`);
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const handleSave = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, saved: post.saved + 1 }
          : post
      )
    );
  };

  return (
    <View className="flex-1 bg-gray-100 pb-20">
      {/* Contenedor de Recetas Populares */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 700 }}
        className="p-4 pt-12"
      >
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Más populares
        </Text>
        <FlatList
          data={popularRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`w-28 h-40 rounded-2xl items-center justify-center shadow-lg ${item.bgColor}`}
            >
              <Ionicons name={item.icon} size={30} color="#FFFFFF" />
              <Text className="text-white mt-2 font-bold">
                {item.title}
              </Text>
              <Text className="text-white text-xs mt-1">{item.days}</Text>
            </TouchableOpacity>
          )}
        />
      </MotiView>

      {/* Lista de Publicaciones */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={() => handlePostClick(post.id)}
            className={`rounded-xl p-4 mb-4 shadow-lg items-center ${post.bgColor}`}
          >
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="items-center"
            >
              {/* Imagen y detalles del usuario */}
              <Image
                source={{ uri: post.userImage }}
                className="w-20 h-20 rounded-full border-2 border-white mb-2"
              />
              <Text className="text-white text-lg font-bold mb-1">
                {post.userName}
              </Text>
              <Text className="text-white italic text-sm mb-2">
                {post.userGoal}
              </Text>
              <Text className="text-white text-center text-sm">
                {post.description}
              </Text>

              {/* Iconos de Me gusta y Guardados */}
              <View className="flex-row mt-4 space-x-4">
                {/* Botón Me gusta */}
                <TouchableOpacity
                  onPress={() => handleLike(post.id)}
                  className="flex-row items-center space-x-1"
                >
                  <Ionicons name="heart" size={24} color="#FFFFFF" />
                  <Text className="text-white text-sm">{post.likes}</Text>
                </TouchableOpacity>

                {/* Botón Guardados */}
                <TouchableOpacity
                  onPress={() => handleSave(post.id)}
                  className="flex-row items-center space-x-1"
                >
                  <MaterialIcons name="bookmark" size={24} color="#FFFFFF" />
                  <Text className="text-white text-sm">{post.saved}</Text>
                </TouchableOpacity>
              </View>
            </MotiView>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom NavBar */}
      <BottomNavBar />
    </View>
  );
};

export default ScreenPosts;
