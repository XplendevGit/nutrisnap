import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";

const ScreenScan = () => {
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
      <View style={styles.container}>
        <Text style={styles.text}>Solicitando permiso para la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No se concedió acceso a la cámara.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title="Escanear de nuevo" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

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
});

export default ScreenScan;
