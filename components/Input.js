import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ onChangeText, value, placeholder, keyboardType, onBlur }) => (
  <TextInput
    style={styles.input}
    onChangeText={onChangeText}
    value={value}
    placeholder={placeholder}
    keyboardType={keyboardType}
    onBlur={onBlur}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Input;
