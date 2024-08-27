import { View, Text, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar'
import PantallaInicio from '../components/screens/PantallaInicio'

export default function index() {
  return (
    <View className="flex-1">
      <PantallaInicio
        backgroundImage={require('../assets/images/Fondo1.png')} // Asegúrate de que la ruta sea correcta
        onLoginPress={() => console.log('Navegar a la pantalla de inicio de sesión')}
        onRegisterPress={() => console.log('Navegar a la pantalla de registro')}
      />
    </View>
  )
}