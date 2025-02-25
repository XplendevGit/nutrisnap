import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ProductProvider } from "../contexts/ProductContext";

export default function _layout() {

  return (
    <ProductProvider>
    <Stack
       screenOptions={{
        headerShown: false
       }}
    />
  </ProductProvider>
  )
}