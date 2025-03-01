import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const ScreenSearchResults = () => {
  const { searchTerm: initialSearchTerm } = useLocalSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  // Lista de marcas chilenas reconocidas
  const chileanBrands = ["Colún", "Soprole", "Watts", "Carozzi", "Lucchetti", "PF", "Ideal", "Loncoleche"];

  // Caché local para evitar repetidas peticiones
  const productCache = {};

  // 🔥 Función con debounce para optimizar la búsqueda
  const fetchProducts = useCallback(
    _.debounce(async (query) => {
      if (!query || query.length < 2) return;
      if (loading) return;

      setLoading(true);

      try {
        if (productCache[query]) {
          console.log("🟢 Cargando datos desde caché...");
          setResults(productCache[query]);
          setLoading(false);
          return;
        }

        const response = await axios.get(`https://cl.openfoodfacts.org/cgi/search.pl`, {
          params: {
            search_terms: query,
            search_simple: 1,
            action: "process",
            json: 1,
            page: 1,
            page_size: 20,
            country: "Chile",
          },
        });

        const fetchedProducts = response.data.products || [];

        productCache[query] = fetchedProducts;

        setResults(fetchedProducts);
        setHasMore(fetchedProducts.length > 0);
        setPage(2);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    fetchProducts(searchTerm);
  }, [searchTerm]);

  const handleLoadMore = () => {
    if (!loading && hasMore) fetchProducts(searchTerm);
  };

  // 🎨 Función para asignar color según la calidad del producto
  const getBackgroundColor = (nutriscore) => {
    switch (nutriscore) {
      case "a":
        return "bg-green-500"; // Saludable
      case "b":
        return "bg-green-400";
      case "c":
        return "bg-yellow-500"; // Intermedio
      case "d":
        return "bg-orange-400";
      case "e":
        return "bg-red-500"; // No saludable
      default:
        return "bg-gray-400"; // Sin datos
    }
  };

  const renderItem = ({ item }) => {
    const brandIsChilean = chileanBrands.some((brand) =>
      item.brands?.toLowerCase().includes(brand.toLowerCase())
    );

    return (
      <TouchableOpacity
        key={item.code || uuidv4()}
        className={`rounded-lg p-4 mb-4 shadow-md border-2 border-gray-200 flex-row items-center ${getBackgroundColor(item.nutrition_grades)}`}
        onPress={() =>
          router.push({ pathname: "./ScreenProductDetail", params: { product: JSON.stringify(item) } })
        }
      >
        {/* Imagen del Producto */}
        <Image
          source={{ uri: item.image_front_url || "https://via.placeholder.com/100" }}
          className="w-20 h-20 rounded-full border-2 border-white shadow-md"
        />

        {/* Información del Producto */}
        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold text-white">{item.product_name}</Text>
          <Text className="text-white text-sm">{item.brands}</Text>

          {/* Indicador de marca chilena */}
          {brandIsChilean && <Text className="text-sm text-white font-bold">🇨🇱 Producto Chileno</Text>}

          {/* Nutrientes destacados */}
          <View className="mt-2">
            <Text className="text-white text-xs">🔥 Calorías: {item.nutriments["energy-kcal"] || "N/A"} kcal</Text>
            <Text className="text-white text-xs">💪 Proteínas: {item.nutriments.proteins || "N/A"}g</Text>
            <Text className="text-white text-xs">🥦 Fibra: {item.nutriments.fiber || "N/A"}g</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#F5F7FA] p-4 pt-12">
      {/* 📢 Título Principal */}
      <Text className="text-2xl font-bold text-gray-800 mb-4">Busca aquí:</Text>

      {/* 🔍 Barra de Búsqueda */}
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="🔍 Buscar producto..."
        className="bg-white rounded-lg px-4 py-3 mb-4 text-gray-700 shadow-md"
      />

      {/* 📢 Título Secundario */}
      <Text className="text-2xl font-bold text-gray-800 mb-4">🍏 Alimentos Encontrados</Text>

      {/* ⏳ Loading */}
      {loading && results.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3CC4B9" />
          <Text className="text-gray-600 mt-2">Buscando productos...</Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.code || uuidv4()}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && hasMore ? <ActivityIndicator size="small" color="#3CC4B9" /> : null}
        />
      ) : (
        !loading && <Text className="text-center text-gray-500 mt-10">No se encontraron resultados.</Text>
      )}
    </View>
  );
};

export default ScreenSearchResults;
