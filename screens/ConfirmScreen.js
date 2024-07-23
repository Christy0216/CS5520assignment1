import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from "../components/Card";
import Button from "../components/Button";

const ConfirmScreen = ({ name, email, onContinue, onGoBack }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.text}>Hello {name}</Text>
      <Text style={styles.text}>Here is the email that you entered:</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.text}>
        If it is not correct, please go back and enter again.
      </Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="GO BACK" 
          onPress={onGoBack} 
          style={styles.goBackButton} 
          textStyle={styles.buttonText} 
        />
        <Button 
          title="CONTINUE" 
          onPress={onContinue} 
          style={styles.continueButton} 
          textStyle={styles.buttonText} 
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#4A90E2',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  goBackButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#EF085F',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  continueButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConfirmScreen;
