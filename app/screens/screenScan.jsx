import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";

const Screenscan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert("Código Escaneado", `Código: ${data}`, [
      {
        text: "Buscar Producto",
        onPress: () => {
          router.push({
            pathname: "../screens/results/ScreenResultScan",
            params: { productCode: data },
          });
        },
      },
      {
        text: "Cerrar",
        onPress: () => setScanned(false),
        style: "cancel",
      },
    ]);
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">Solicitando permiso para la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">No se concedió acceso a la cámara.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View className="absolute bottom-10 w-full items-center">
          <Text className="text-white text-lg">Procesando...</Text>
        </View>
      )}
    </View>
  );
};

export default Screenscan;
