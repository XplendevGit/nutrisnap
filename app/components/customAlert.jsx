import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';

const CustomAlert = ({ visible, type, title, message, onClose }) => {
  // Colores para los diferentes tipos de alertas
  const backgroundColor = type === "success" ? "bg-[#E7F8F6]" : "bg-[#FEE2E2]";
  const buttonColor = type === "success" ? "bg-[#3CC4B8]" : "bg-[#EF4444]";
  const textColor = type === "success" ? "text-[#3CC4B8]" : "text-[#EF4444]";
  const iconSource =
    type === "success"
      ? require("../../assets/images/success-icon.png")
      : require("../../assets/images/error-icon.png");

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className={`rounded-2xl w-[80%] p-6 items-center ${backgroundColor}`}>
          {/* Icono */}
          <Image source={iconSource} className="w-16 h-16 mb-4" />

          {/* Título */}
          <Text className={`text-lg font-bold text-center mb-2 ${textColor}`}>
            {title}
          </Text>

          {/* Mensaje */}
          <Text className="text-gray-700 text-center mb-6">
            {message}
          </Text>

          {/* Botón */}
          <TouchableOpacity
            className={`w-[60%] py-3 rounded-full ${buttonColor}`}
            onPress={onClose}
          >
            <Text className="text-white text-center font-bold">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
