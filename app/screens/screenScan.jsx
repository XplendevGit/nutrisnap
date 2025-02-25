import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";

const ScreenScan = () => {
  const [hasPermission, setHasPermission] = useState(null); // Estado del permiso de la cámara
  const [scanned, setScanned] = useState(false); // Control del estado del escaneo
  const router = useRouter();

  useEffect(() => {
    // Solicitar permiso para usar la cámara
    const requestCameraPermission = async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        console.error("Error solicitando permisos de cámara:", error);
        setHasPermission(false);
      }
    };

    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true); // Evitar múltiples escaneos
    Alert.alert("Código Escaneado", `Código: ${data}`, [
      {
        text: "Buscar Producto",
        onPress: () => {
          // Redirigir a la pantalla de resultados con el código escaneado
          router.push({
            pathname: "/screens/results/ScreenResultScan",
            params: { productCode: data },
          });
        },
      },
      {
        text: "Cerrar",
        onPress: () => setScanned(false), // Habilitar nuevos escaneos
        style: "cancel",
      },
    ]);
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-lg">Solicitando permiso para la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-lg mb-4">No se concedió acceso a la cámara.</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Permiso necesario", "Activa los permisos en la configuración.")
          }
          className="bg-blue-500 py-3 px-6 rounded-lg"
        >
          <Text className="text-white text-lg font-bold">Abrir Configuración</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        className="absolute inset-0"
      />
      {scanned && (
        <View className="absolute bottom-10 w-full flex items-center">
          <TouchableOpacity
            onPress={() => setScanned(false)}
            className="bg-green-500 py-3 px-6 rounded-lg"
          >
            <Text className="text-white text-lg font-bold">Escanear de nuevo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ScreenScan;
