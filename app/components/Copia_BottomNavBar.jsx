import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { MotiView } from 'moti';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import BarcodeScannerReact from './BarcodeScannerReact';
import { fetchProductByBarcode } from '../../api/OpenFoodFactsScanBar';

const BottomNavBar = () => {
  const router = useRouter();
  const [isScannerActive, setIsScannerActive] = useState(false); // Estado para activar/desactivar el escáner
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleProfilePress = () => {
    router.push('../screens/screenProfile');
  };

  const handleMainPress = () => {
    router.push('../screens/screenMain');
  };

  const handleNewsPress = () => {
    router.push('../screens/screenPosts');
  };

  const handlePaymentPress = () => {
    router.push('../screens/screenPayment');
  };

  const handleScanPress = async () => {
    setLoading(true); // Activa el estado de carga
    setIsScannerActive(true); // Activa el estado del escáner
    const testBarcode = "7802215121265"; // Código de prueba

    try {
      const response = await fetchProductByBarcode(testBarcode);
      if (response.status === 1) {
        router.push({
          pathname: "../screens/results/ScreenResultScan",
          params: { productCode: testBarcode }, // Envía el código de barras
        });
      } else {
        Alert.alert("Producto no encontrado", "No se encontraron datos para este código.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al buscar el producto. Inténtalo de nuevo.");
    } finally {
      setLoading(false); // Finaliza el estado de carga
      setIsScannerActive(false); // Finaliza el estado del escáner
    }
  };


  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      className="absolute bottom-0 w-full bg-white shadow-md rounded-t-xl flex-row justify-between px-6 py-4"
    >

                  {/* Loading Overlay */}
            {loading && (
        <View className="absolute z-50 w-screen h-screen bg-black/50">
          <ActivityIndicator size="large" color="#3CC4B9" />
          <Text className="text-lg text-white">Escaneando...</Text>
        </View>
      )}
      {/* Botón Animado (Lottie) */}
      <TouchableOpacity
        onPress={handleNewsPress}
        className="flex items-center pt-[1px]"
        style={{ width: 50, height: 50 }}
      >
        <View
          style={{
            width: 28,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LottieView
            source={require('../../assets/animations/icon3.json')} // Ruta del archivo Lottie
            autoPlay
            loop
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <Text className="text-[16px] text-primary">News</Text>
      </TouchableOpacity>

      {/* Botón Escanear */}
      <TouchableOpacity
        onPress={handleScanPress}
        className="flex items-center pt-[1px]"
        style={{ width: 50, height: 50 }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/images/escanear.png')} // Ruta del archivo PNG
            style={{
              width: 28,
              height: 28,
            }}
          />
        </View>
        <Text className="pt-[1px] text-[16px] text-primary">Scan</Text>
      </TouchableOpacity>

      {/* Botón Central (Logo1) */}
      <TouchableOpacity
        onPress={handleMainPress}
        className="relative flex items-center"
      >
        <View
          className="rounded-full bg-primary flex flex-row items-center justify-center shadow-lg"
          style={{ width: 60, height: 60 }}
        >
          <Image
            source={require('../../assets/images/Logo1_all_white.png')} // Ruta de la imagen central
            style={{ width: 35, height: 35, resizeMode: 'contain' }}
          />
        </View>
      </TouchableOpacity>

      {/* Botón Suscripción */}
      <TouchableOpacity
        onPress={handlePaymentPress}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <View
          style={{
            width: 30, // Ancho del contenedor
            height: 30, // Alto del contenedor
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
                        <LottieView 
                          source={require('../../assets/animations/star.json')}
                          autoPlay
                          loop
                          style={{
                            position: 'flex',
                            top: 0,
                            right: 0,
                            width: 55,
                            height: 55,
                            marginBottom: 4,
                          }}
                        />
        </View>
        <Text style={{ paddingTop: 0, fontSize: 16, color: '#3CC4B9' }}>Premium</Text>
      </TouchableOpacity>

      {/* Botón Mi Perfil */}
      <TouchableOpacity onPress={handleProfilePress} className="pt-[3px] flex items-center">
        <View
          style={{
            width: 33,
            height: 29,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/images/profile.png')} // Ruta del archivo PNG
            style={{
              width: 40,
              height: 38,
            }}
          />
        </View>
        <Text className="pt-[2px] text-[16px] text-primary">Perfil</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  navBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
});