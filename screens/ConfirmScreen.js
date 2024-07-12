import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from "../components/Card";
import Button from "../components/Button";

const ConfirmScreen = ({ name, email, onContinue, onGoBack }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Email: {email}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go Back" onPress={onGoBack} style={styles.button} />
        <Button title="Continue" onPress={onContinue} style={styles.button} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 340,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ConfirmScreen;
