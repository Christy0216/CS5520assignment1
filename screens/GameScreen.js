import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, Image } from 'react-native';
import Card from "../components/Card";

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const GameScreen = ({ onRestart }) => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [userNumber, setUserNumber] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(timerId);
          setGameOver(true);
          setGameResult('Time is over');
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleGuess = () => {
    const number = parseInt(userNumber);
    if (isNaN(number) || number < 1 || number > 100) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 100.');
      return;
    }
    if (number === randomNumber) {
      setGameResult(`You guessed it right in ${4 - attemptsLeft + 1} attempts!`);
      setGameOver(true);
    } else {
      setAttemptsLeft(prevAttempts => prevAttempts - 1);
      if (attemptsLeft - 1 <= 0) {
        setGameResult('You ran out of attempts.');
        setGameOver(true);
      }
    }
  };

  const handleHint = () => {
    if (hintUsed) return;
    setHintUsed(true);
    Alert.alert('Hint', randomNumber > 50 ? 'The number is greater than 50.' : 'The number is less than or equal to 50.');
  };

  const handleGuessAgain = () => {
    setUserNumber('');
  };

  const handleEndGame = () => {
    setGameResult('You chose to end the game.');
    setGameOver(true);
  };

  const handleNewGame = () => {
    setRandomNumber(generateRandomNumber());
    setUserNumber('');
    setAttemptsLeft(4);
    setTimer(60);
    setGameOver(false);
    setHintUsed(false);
    setGameResult(null);
  };

  if (gameOver) {
    return (
      <View style={styles.screen}>
        <Card style={styles.card}>
          <Text style={styles.resultText}>{gameResult}</Text>
          {gameResult.startsWith('You guessed it right') && (
            <Image
              style={styles.image}
              source={{ uri: `https://picsum.photos/id/${randomNumber}/100/100` }}
            />
          )}
          {(gameResult === 'You ran out of attempts.' || gameResult === 'Time is over') && (
            <Image
              style={styles.image}
              source={require('../assets/sad_smiley.jpg')}
            />
          )}
          <Text>The game is over</Text>
          <Button title="New Game" onPress={handleNewGame} />
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Button title="Restart" onPress={onRestart} />
      <Card style={styles.card}>
        <Text style={styles.text}>Guess the number between 1 and 100</Text>
        <Text style={styles.text}>Time left: {timer} seconds</Text>
        <Text style={styles.text}>Attempts left: {attemptsLeft}</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={setUserNumber}
          value={userNumber}
        />
        <Button title="Use a hint" onPress={handleHint} disabled={hintUsed} />
        <Button title="Submit guess" onPress={handleGuess} />
        {attemptsLeft < 4 && !gameOver && (
          <View>
            <Button title="Guess again" onPress={handleGuessAgain} />
            <Button title="End the game" onPress={handleEndGame} />
          </View>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: "100%",
    maxWidth: 340,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default GameScreen;
