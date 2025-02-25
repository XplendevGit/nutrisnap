import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { v4 as uuidv4 } from 'uuid'; // Instala: npm install uuid

const ScreenSearchResults = () => {
  const { searchTerm: initialSearchTerm } = useLocalSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const chileanBrands = ['Colún', 'Soprole', 'Watts', 'Carozzi', 'Lucchetti', 'PF', 'Ideal', 'Loncoleche'];

  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      setPage(1);
      setResults([]);
      fetchProducts(1, searchTerm);
    }
  }, [searchTerm]);

  const fetchProducts = async (pageNumber, query) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(`https://cl.openfoodfacts.org/cgi/search.pl`, {
        params: {
          search_terms: query,
          search_simple: 1,
          action: 'process',
          json: 1,
          page: pageNumber,
          page_size: 20,
          country: 'Chile',
        },
      });

      const fetchedProducts = response.data.products || [];

      // Eliminar duplicados por 'code' y asignar claves únicas
      const uniqueCodes = new Set();
      const uniqueProducts = fetchedProducts
        .filter((item) => item.product_name && item.brands)
        .map((item) => {
          const code = item.code && !uniqueCodes.has(item.code) ? item.code : uuidv4();
          uniqueCodes.add(code);
          return { ...item, uniqueKey: code };
        });

      // Priorizar marcas chilenas
      const sortedProducts = uniqueProducts.sort((a, b) => {
        const aChilean = chileanBrands.some((brand) => a.brands?.toLowerCase().includes(brand.toLowerCase()));
        const bChilean = chileanBrands.some((brand) => b.brands?.toLowerCase().includes(brand.toLowerCase()));
        return aChilean === bChilean ? 0 : aChilean ? -1 : 1;
      });

      setResults((prev) => (pageNumber === 1 ? sortedProducts : [...prev, ...sortedProducts]));
      setHasMore(fetchedProducts.length > 0);
      setPage(pageNumber + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) fetchProducts(page, searchTerm);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.uniqueKey}
      className="bg-white rounded-lg shadow-md p-4 mb-4 flex-row items-center"
      onPress={() => router.push({ pathname: './ScreenProductDetail', params: { product: JSON.stringify(item) } })}
    >
      <Image
        source={{ uri: item.image_front_url || 'https://via.placeholder.com/100' }}
        className="w-16 h-16 rounded-md"
      />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold">{item.product_name}</Text>
        <Text className="text-gray-500">{item.brands}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#F5F7FA] p-4">
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Buscar producto..."
        className="bg-white rounded-lg px-4 py-3 mb-4 text-gray-700 shadow-md"
      />

      <Text className="text-2xl font-bold mb-4">Resultados para "{searchTerm}"</Text>

      {loading && results.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3CC4B9" />
          <Text className="text-gray-600 mt-2">Buscando productos...</Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.uniqueKey}  // ¡Clave única garantizada!
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
