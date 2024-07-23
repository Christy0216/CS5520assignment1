import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../components/Colors";

const Button = ({ title, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  disabledText: {
    color: Colors.grey,
  },
});

export default Button;
