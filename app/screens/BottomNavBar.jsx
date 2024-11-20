import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';

const BottomNavBar = ({ navigation }) => {
  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      className="absolute bottom-0 w-full bg-white shadow-md rounded-t-xl flex-row justify-between px-6 py-4"
    >
      {/* Home Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} className="flex items-center">
        <AntDesign name="home" size={24} color="#388E3C" />
        <Text className="text-xs text-gray-500">Home</Text>
      </TouchableOpacity>

      {/* My Task Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Tasks')} className="flex items-center">
        <MaterialIcons name="assignment" size={24} color="#388E3C" />
        <Text className="text-xs text-gray-500">My Task</Text>
      </TouchableOpacity>

      {/* Center Floating Button */}
      <View className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 rounded-full w-16 h-16 flex justify-center items-center shadow-lg">
        <TouchableOpacity onPress={() => navigation.navigate('AddTask')}>
          <AntDesign name="plus" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Payment Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Payment')} className="flex items-center">
        <MaterialIcons name="payments" size={24} color="#388E3C" />
        <Text className="text-xs text-gray-500">Payment</Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} className="flex items-center">
        <AntDesign name="user" size={24} color="#388E3C" />
        <Text className="text-xs text-gray-500">Profile</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

export default BottomNavBar;
