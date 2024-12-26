import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native"; // Cambiado a useRoute
import { fetchProductByBarcode } from "../../../api/OpenFoodFactsScanBar";

const ScreenResultScan = () => {
  const route = useRoute(); // Obtiene los parámetros de navegación
  const { productCode } = route.params || {}; // Accede al parámetro productCode
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductByBarcode(productCode);
        if (response.status === 1) {
          setProductData(response.product);
        } else {
          setProductData(null); // Producto no encontrado
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    if (productCode) {
      fetchProduct();
    }
  }, [productCode]);

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

  if (!productData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl text-red-600">Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-4">
        {productData.product_name || "Producto desconocido"}
      </Text>
      <View className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <Text className="text-lg font-bold">Marca:</Text>
        <Text className="text-gray-800">{productData.brands || "No disponible"}</Text>
      </View>
      <View className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <Text className="text-lg font-bold">Categoría:</Text>
        <Text className="text-gray-800">{productData.categories || "No disponible"}</Text>
      </View>
      <View className="bg-gray-100 p-4 rounded-lg shadow-md">
        <Text className="text-lg font-bold">Calorías:</Text>
        <Text className="text-gray-800">
          {productData.nutriments?.["energy-kcal"] || "No disponible"} kcal
        </Text>
      </View>
    </View>
  );
};

export default ScreenResultScan;
