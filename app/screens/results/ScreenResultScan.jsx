import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSearchParams } from 'expo-router';

const ScreenResultScan = () => {
  const { productCode } = useSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código Escaneado</Text>
      <Text style={styles.text}>{productCode}</Text>
      {/* Aquí podrías buscar y mostrar más información del producto usando el código */}
    </View>
  );
};

export default ScreenResultScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});
