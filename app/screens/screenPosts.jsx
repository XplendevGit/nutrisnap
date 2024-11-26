import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
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
    bgColor: 'bg-green-500', // Verde NutriSnap
    likes: 12,
    saved: 5,
  },
  {
    id: 2,
    userImage: 'https://via.placeholder.com/100',
    userName: 'John Doe',
    userGoal: 'Ganancia muscular',
    description: 'Receta alta en proteínas recomendada.',
    bgColor: 'bg-orange-500', // Naranja NutriSnap
    likes: 20,
    saved: 8,
  },
  {
    id: 3,
    userImage: 'https://via.placeholder.com/100',
    userName: 'Sophia Smith',
    userGoal: 'Dieta vegana',
    description: 'Revisión de alimentos veganos ricos en hierro.',
    bgColor: 'bg-blue-500', // Azul NutriSnap
    likes: 35,
    saved: 12,
  },
  {
    id: 4,
    userImage: 'https://via.placeholder.com/100',
    userName: 'Emma Johnson',
    userGoal: 'Mejorar salud cardiovascular',
    description: 'Selección de alimentos bajos en sodio.',
    bgColor: 'bg-purple-500', // Morado NutriSnap
    likes: 50,
    saved: 18,
  },
];

const ScreenPosts = () => {
  const router = useRouter();
  const [posts, setPosts] = useState(postsData);

  const handlePostClick = (postId) => {
    // Redirige a la pantalla de detalles de la publicación
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
      {/* Título Principal */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 700 }}
        className="p-4 bg-green-700 rounded-b-xl mb-4"
      >
        <Text className="text-white text-xl font-bold text-center">
          Comparaciones y Recetas
        </Text>
        <Text className="text-gray-200 text-center mt-1">
          Explora las publicaciones y selecciona lo que más te interese
        </Text>
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
                  <Ionicons
                    name="heart"
                    size={24}
                    color="#FFFFFF"
                  />
                  <Text className="text-white text-sm">{post.likes}</Text>
                </TouchableOpacity>

                {/* Botón Guardados */}
                <TouchableOpacity
                  onPress={() => handleSave(post.id)}
                  className="flex-row items-center space-x-1"
                >
                  <MaterialIcons
                    name="bookmark"
                    size={24}
                    color="#FFFFFF"
                  />
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
