import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchProductByBarcode } from "../../../api/OpenFoodFactsScanBar";
import { auth, db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { MotiView } from "moti";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const ScreenResultScan = () => {
  const route = useRoute();
  const { productCode } = route.params || {};
  const [productData, setProductData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch product data
        const productResponse = await fetchProductByBarcode(productCode);
        if (productResponse.status === 1) {
          setProductData(productResponse.product);
        } else {
          setProductData(null);
        }

        // Fetch user data
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData(null);
          }
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudo conectar al servidor. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [productCode]);

  const isUnhealthy = (nutriments) => {
    const sugar = nutriments?.sugars || 0;
    const calories = nutriments?.["energy-kcal"] || 0;
    return sugar > 20 || calories > 500; // Ejemplo de criterio: alto en azúcar o muchas calorías
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3CC4B9" />
        <Text className="text-lg text-gray-600 mt-4">Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-xl text-red-600">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header Section */}
      <View
        style={{
          backgroundColor: '#3CC4B9',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          height: 240,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
       className="bg-[#3CC4B9] rounded-b-[40px] shadow-2xl shadow-[#3CC4B9] px-6 h-[190px] py-20 items-center elevation-8">

        <Image
          source={{ uri: productData?.image_url || "https://via.placeholder.com/150" }}
          className="w-52 h-52 rounded-full border-4 border-white shadow-lg"
        />

      </View>

      <MotiView
        from={{ translateY: 50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: "timing", duration: 500 }}
        className="p-6 pt-16"
      >
        {/* Product Details */}
        <View className="bg-white p-4 rounded-xl shadow-md mb-6">
        <View className="flex-row space-x-4 items-center mb-2">
          {/* Icono del tipo de alimento */}
          <FontAwesome5 
            name={productData?.categories?.includes("chocolate") ? "cookie-bite" : "utensils"} 
            size={32} 
            color="#3CC4B9" 
          />

          {/* Icono de salud */}
          {isUnhealthy(productData?.nutriments) ? (
            <Feather name="alert-circle" size={36} color="red" />
          ) : (
            <Feather name="check-circle" size={36} color="green" />
          )}
        </View>

          {/* Marca Producto */}
          <View className="bg-[#3CC4B9] w-auto mr-auto py-2 px-4 rounded-full">
           <Text className="text-white text-lg">{productData?.brands || "No disponible"}
          </Text>
         </View>

        {/* Nombre Producto */}
          <Text className="text-black text-3xl font-bold mt-4">
            {productData?.product_name || "Producto desconocido"}
          </Text>



          {/* Titulo Informacion Nutricional*/}
          <Text className="text-lg font-bold text-gray-800 mb-2">Información Nutricional:
          </Text>

          {/* Informacion Nutricional Completa */}
          <View className="space-y-1">
            <Text className="text-gray-600">Calorías: {productData?.nutriments?.["energy-kcal"] || "No disponible"} kcal</Text>
            <Text className="text-gray-600">Proteínas: {productData?.nutriments?.proteins || "No disponible"} g</Text>
            <Text className="text-gray-600">Grasas: {productData?.nutriments?.fat || "No disponible"} g</Text>
            <Text className="text-gray-600">Carbohidratos: {productData?.nutriments?.carbohydrates || "No disponible"} g</Text>
            <Text className="text-gray-600">Azúcares: {productData?.nutriments?.sugars || "No disponible"} g</Text>
            <Text className="text-gray-600">Fibra: {productData?.nutriments?.fiber || "No disponible"} g</Text>
          </View>
        </View>

        {/* User Profile Data*/}
        <Text className="text-2xl font-bold text-gray-800 mb-4 px-4">Tu Perfil</Text>
        {userData ? (
          <View className="bg-gray-100 p-4 rounded-xl shadow-md mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-2">Nombre:</Text>
            <Text className="text-gray-600 mb-2">{userData.fullName}</Text>

            <Text className="text-lg font-bold text-gray-800 mb-2">Objetivo:</Text>
            <Text className="text-gray-600 mb-2">{userData.objective || "No especificado"}</Text>

            <Text className="text-lg font-bold text-gray-800 mb-2">Peso:</Text>
            <Text className="text-gray-600 mb-2">{userData.weight || "No especificado"} kg</Text>

            <Text className="text-lg font-bold text-gray-800 mb-2">Estatura:</Text>
            <Text className="text-gray-600 mb-2">{userData.height || "No especificado"} cm</Text>

            <Text className="text-lg font-bold text-gray-800 mb-2">Dieta:</Text>
            <Text className="text-gray-600 mb-2">{userData.diet || "No especificada"}</Text>
          </View>
        ) : (
          <Text className="text-lg text-red-600">Por favor, regístrate para ver tu información.</Text>
        )}

        {/* AI Analysis Placeholder */}
        <View className="bg-gray-100 p-4 rounded-xl shadow-md mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">Resultado basado en IA:</Text>
          <Text className="text-gray-600 italic">Esta sección será implementada próximamente...</Text>
        </View>
      </MotiView>

{/* Action Buttons */}
<View className="flex-row justify-center items-center space-x-4 mb-6 w-[90%] mx-auto">
  {/* Botón Circular con Ícono */}
  <TouchableOpacity className="bg-white border-2 border-[#3CC4B9] w-14 h-14 rounded-full items-center justify-center shadow-lg">
    <Image
      source={require('../../../assets/images/compartir.png')} // Ruta del icono PNG
      className="w-6 h-6"
      resizeMode="contain"
    />
  </TouchableOpacity>

  {/* Botón Principal */}
  <TouchableOpacity className="bg-teal-500 py-4 flex-1 rounded-full items-center shadow-lg">
    <Text className="text-white text-lg font-bold">Finalizar</Text>
  </TouchableOpacity>
</View>
    </ScrollView>
  );
};

export default ScreenResultScan;