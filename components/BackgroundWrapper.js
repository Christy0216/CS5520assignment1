// BackgroundWrapper.js
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

const BackgroundWrapper = ({ children }) => {
  return (
    <LinearGradient colors={["#ff9a9e", "#fad0c4"]} style={styles.background}>
      <View style={styles.container}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackgroundWrapper;
