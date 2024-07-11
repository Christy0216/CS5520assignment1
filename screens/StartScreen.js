import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

const StartScreen = ({ onStartGame }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isChecked, setChecked] = useState(false);

  const validateName = () => {
    if (name.trim().length <= 1 || /\d/.test(name)) {
      setNameError(
        "Name must be more than one character and not contain numbers"
      );
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleStart = () => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    if (isNameValid && isEmailValid && isChecked) {
      onStartGame(name, email);
    }
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Input
          placeholder="Name"
          onChangeText={setName}
          value={name}
          onBlur={validateName}
          style={nameError ? styles.errorInput : null}
        />
        {nameError !== "" && <Text style={styles.errorText}>{nameError}</Text>}

        <Input
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          onBlur={validateEmail}
          style={emailError ? styles.errorInput : null}
        />
        {emailError !== "" && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <View style={styles.checkboxContainer}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} containerStyle={styles.containerStyle}/>
        <Text style={styles.label}>I agree to the terms and conditions</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Reset"
            onPress={() => {
              setName("");
              setEmail("");
              setChecked(false);
              setNameError("");
              setEmailError("");
            }}
            style={styles.button}
          />

          <Button
            title="Start"
            onPress={handleStart}
            disabled={!isChecked}
            style={styles.button}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    padding: 20,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
  },
  errorInput: {
    borderColor: "red",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  containerStyle: { padding: 10 },
  checkbox: {
    marginRight: 5,
  },
  label: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default StartScreen;
