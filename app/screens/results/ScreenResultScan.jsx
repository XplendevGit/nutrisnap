import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchProductByBarcode } from "../../../api/OpenFoodFactsScanBar";
import { auth, db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { MotiView } from "moti";

const ScreenResultScan = () => {
  const route = useRoute();
  const { productCode } = route.params || {};
  const [productData, setProductData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState(null);

  // Función para reintentar solicitudes
  const retryFetch = async (fetchFunction, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetchFunction();
        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setScanning(true);

        // Solicitud de datos del producto
        const productResponse = await retryFetch(() =>
          fetchProductByBarcode(productCode)
        );
        if (productResponse.status === 1) {
          setProductData(productResponse.product);
        } else {
          setProductData(null);
        }

        // Solicitud de datos del usuario
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
        setScanning(false);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [productCode]);

  if (scanning) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3CC4B9" />
        <Text className="text-lg text-gray-600 mt-4">Escaneando...</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3CC4B9" />
        <Text className="text-lg text-gray-600 mt-4">Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl text-red-600">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Encabezado */}
      <View className="bg-[#3CC4B9] h-48 w-full rounded-b-[12px] items-center justify-end relative">
        <Text className="text-white text-2xl font-bold">Detalles del Producto</Text>
        <Image
          source={{ uri: productData?.image_url || "https://via.placeholder.com/150" }}
          className="w-24 h-24 rounded-full border-4 border-white shadow-md mt-4"
        />
      </View>

      <MotiView
        from={{ translateY: 50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: "timing", duration: 500 }}
        className="p-6"
      >
        {/* Información del Producto */}
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          {productData?.product_name || "Producto desconocido"}
        </Text>
        <View className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-bold">Marca:</Text>
          <Text className="text-gray-800">{productData?.brands || "No disponible"}</Text>
        </View>
        <View className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-bold">Categoría:</Text>
          <Text className="text-gray-800">{productData?.categories || "No disponible"}</Text>
        </View>
        <View className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-bold">Ingredientes:</Text>
          <Text className="text-gray-800">{productData?.ingredients_text || "No disponible"}</Text>
        </View>
        <View className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Text className="text-lg font-bold">Información Nutricional:</Text>
          <Text className="text-gray-800">
            Calorías: {productData?.nutriments?.["energy-kcal"] || "No disponible"} kcal
          </Text>
          <Text className="text-gray-800">
            Grasas: {productData?.nutriments?.["fat"] || "No disponible"} g
          </Text>
          <Text className="text-gray-800">
            Proteínas: {productData?.nutriments?.["proteins"] || "No disponible"} g
          </Text>
          <Text className="text-gray-800">
            Azúcares: {productData?.nutriments?.["sugars"] || "No disponible"} g
          </Text>
        </View>

        {/* Información del Usuario */}
        <Text className="text-2xl font-bold text-gray-800 mt-8 mb-4">Tu Perfil</Text>
        {userData ? (
          <View>
            <Text className="text-lg font-bold">Nombre:</Text>
            <Text className="text-gray-800 mb-2">{userData.fullName}</Text>

            <Text className="text-lg font-bold">Objetivo:</Text>
            <Text className="text-gray-800 mb-2">{userData.objective || "No especificado"}</Text>

            <Text className="text-lg font-bold">Peso:</Text>
            <Text className="text-gray-800 mb-2">{userData.weight || "No especificado"} kg</Text>

            <Text className="text-lg font-bold">Estatura:</Text>
            <Text className="text-gray-800 mb-2">{userData.height || "No especificado"} cm</Text>

            <Text className="text-lg font-bold">Dieta:</Text>
            <Text className="text-gray-800 mb-2">{userData.diet || "No especificada"}</Text>
          </View>
        ) : (
          <Text className="text-lg text-red-600">Por favor, regístrate para ver tu información.</Text>
        )}
      </MotiView>
    </ScrollView>
  );
};

export default ScreenResultScan;
