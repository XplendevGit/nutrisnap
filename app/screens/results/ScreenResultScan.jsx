import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import fetchProductData from "../../../api/fetchProductData";

const ScreenResultScan = () => {
  const router = useRouter();
  const productCode = router.query?.productCode;
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productCode) {
        console.error("No se proporcionó productCode");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProductData(productCode);
        console.log("Datos del producto:", data);
        setProductData(data);
      } catch (error) {
        console.error("Error al obtener datos del producto:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      console.warn("El tiempo de espera de la API ha expirado");
      setLoading(false);
    }, 10000);

    fetchProduct();

    return () => clearTimeout(timeout);
  }, [productCode]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3CC4B9" />
        <Text className="text-lg text-gray-600 mt-4">Cargando...</Text>
      </View>
    );
  }

  if (!productData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <Text className="text-2xl font-bold text-red-600 mb-4">
          Producto no encontrado
        </Text>
        <Text className="text-lg text-gray-600 text-center">
          Intenta escanear nuevamente o verifica el código.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Image
        source={{ uri: productData.image_url || "https://via.placeholder.com/150" }}
        className="w-40 h-40 self-center rounded-lg mb-6"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        {productData.product_name || "Producto no identificado"}
      </Text>
      <View className="bg-gray-100 p-4 rounded-lg mb-4">
        <Text className="text-lg font-bold text-gray-800">Marca:</Text>
        <Text className="text-gray-600">{productData.brands || "No disponible"}</Text>
      </View>
      <View className="bg-gray-100 p-4 rounded-lg">
        <Text className="text-lg font-bold text-gray-800 mb-2">Información Nutricional:</Text>
        <Text className="text-gray-600">
          Calorías: {productData?.nutriments?.["energy-kcal"] || "No disponible"} kcal
        </Text>
        <Text className="text-gray-600">
          Azúcares: {productData?.nutriments?.sugars || "No disponible"} g
        </Text>
      </View>
    </ScrollView>
  );
};

export default ScreenResultScan;
