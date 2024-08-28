import { View, Text, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//Screens
import ScreenHome from './screens/screenHome'

export default function index() {
  return (
    <View className="flex-1">
      <ScreenHome
        backgroundImage={require('../assets/images/Fondo1.png')} 
      />
    </View>
  )
}