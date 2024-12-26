import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import BarcodeScanner from './BarcodeScanner';
import { fetchProductByBarcode } from '../../api/OpenFoodFactsScanBar';

const BottomNavBar = () => {
  const router = useRouter();
  const [isScannerActive, setIsScannerActive] = useState(false); // Estado para activar/desactivar el escáner

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

  const handleScanPress = () => {
    router.push('../screens/screenScan'); // Redirige a la pantalla de escaneo
  };


  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      className="absolute bottom-0 w-full bg-white shadow-md rounded-t-xl flex-row justify-between px-6 py-4"
    >
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

            {/* Muestra el escáner si está activo */}
            {isScannerActive && (
        <View style={styles.scannerContainer}>
          <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
        </View>
      )}

    </MotiView>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  cameraContainer: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  scannerContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

