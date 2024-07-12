import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import Checkbox from "expo-checkbox";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Colors from "../components/Colors";
import ConfirmScreen from "./ConfirmScreen";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { LinearGradient } from "expo-linear-gradient";

const StartScreen = ({ onContinue }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
      setModalVisible(true);
    }
  };

  const handleGoBack = () => {
    setModalVisible(false);
  };

  const handleContinue = () => {
    setModalVisible(false);
    onContinue(name, email);
  };

  return (
    <BackgroundWrapper>
      <Text style={styles.title}>Welcome</Text>
      <Card style={styles.card}>
        <Input
          placeholder="Name"
          onChangeText={setName}
          value={name}
          onBlur={validateName}
          style={nameError ? [styles.input, styles.errorInput] : styles.input}
        />
        {nameError !== "" && <Text style={styles.errorText}>{nameError}</Text>}

        <Input
          placeholder="Email address"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          onBlur={validateEmail}
          style={emailError ? [styles.input, styles.errorInput] : styles.input}
        />
        {emailError !== "" && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={styles.label}>I am not a robot</Text>
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
            style={styles.resetButton}
          />

          <Button
            title="Start"
            onPress={handleStart}
            disabled={!isChecked}
            style={isChecked ? styles.startButton : styles.startButtonDisabled}
            textStyle={
              isChecked
                ? styles.startButtonText
                : styles.startButtonTextDisabled
            }
          />
        </View>
      </Card>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.8)",
            "rgba(0,0,0,0.6)",
            "rgba(0,0,0,0.4)",
            "rgba(0,0,0,0.2)",
            "transparent",
          ]}
          style={styles.modalBackground}
        >
          <View style={styles.modalContainer}>
            <ConfirmScreen
              name={name}
              email={email}
              onContinue={handleContinue}
              onGoBack={handleGoBack}
            />
          </View>
        </LinearGradient>
      </Modal>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: Colors.purple,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
  },
  input: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginBottom: 20,
    color: Colors.primary,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
  },
  errorInput: {
    borderBottomColor: "red",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: Colors.purple,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resetButton: {
    flex: 1,
    marginHorizontal: 5,
    color: Colors.white,
    backgroundColor: Colors.pink,
  },
  startButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  startButtonDisabled: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  startButtonText: {
    color: Colors.white,
  },
  startButtonTextDisabled: {
    color: Colors.grey,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
  },
  gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartScreen;
