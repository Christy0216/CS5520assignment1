import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import Card from "../components/Card";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Colors from "../components/Colors";

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const GameScreen = ({ onRestart, onNewGame }) => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [userNumber, setUserNumber] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timer, setTimer] = useState(300);
  const [gameOver, setGameOver] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [guessResult, setGuessResult] = useState(null);

  useEffect(() => {
    if (!gameOver) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerId);
            setGameOver(true);
            setGuessResult("You are out of time");
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [gameOver]);

  const handleGuess = () => {
    const number = parseInt(userNumber);
    if (isNaN(number) || number < 1 || number > 100) {
      Alert.alert("Invalid Input", "Please enter a number between 1 and 100.");
      return;
    }
    if (number === randomNumber) {
      setGuessResult(
        `You guessed correct! Attempts used: ${4 - attemptsLeft + 1}`
      );
      setGameOver(true);
    } else {
      setAttemptsLeft((prevAttempts) => prevAttempts - 1);
      if (attemptsLeft - 1 <= 0) {
        setGuessResult("You ran out of attempts.");
        setGameOver(true);
      } else {
        setGuessResult("You did not guess correct!");
      }
    }
  };

  const handleHint = () => {
    if (hintUsed) return;
    setHintUsed(true);
    Alert.alert(
      "Hint",
      randomNumber > 50
        ? "The number is greater than 50."
        : "The number is less than or equal to 50."
    );
  };

  const handleGuessAgain = () => {
    setUserNumber("");
    setGuessResult(null);
  };

  const handleEndGame = () => {
    setGuessResult("You chose to end the game.");
    setGameOver(true);
  };

  const handleNewGame = () => {
    setRandomNumber(generateRandomNumber());
    setUserNumber("");
    setAttemptsLeft(4);
    setTimer(300);
    setGameOver(false);
    setHintUsed(false);
    setGuessResult(null);
    onNewGame();
  };

  if (gameOver) {
    return (
      <BackgroundWrapper>
        <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
          <Text style={styles.buttonText}>RESTART</Text>
        </TouchableOpacity>
        <Card style={styles.card}>
          {guessResult.startsWith("You guessed correct!") ? (
            <>
              <Text style={styles.resultText}>{guessResult}</Text>
              <Image
                style={styles.image}
                source={{
                  uri: `https://picsum.photos/id/${randomNumber}/100/100`,
                }}
              />
              <TouchableOpacity onPress={handleNewGame} style={styles.button}>
                <Text style={styles.buttonText}>NEW GAME</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.resultText}>The game is over!</Text>
              <Image
                style={styles.image}
                source={require("../assets/sad_smiley.jpg")}
              />
              <Text style={styles.resultText}>{guessResult}</Text>
            </>
          )}
        </Card>
      </BackgroundWrapper>
    );
  }

  if (guessResult === "You did not guess correct!") {
    return (
      <BackgroundWrapper>
        <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
          <Text style={styles.buttonText}>RESTART</Text>
        </TouchableOpacity>
        <Card style={styles.card}>
          <Text style={styles.title}>{guessResult}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleGuessAgain} style={styles.button}>
              <Text style={styles.buttonText}>TRY AGAIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEndGame} style={styles.button}>
              <Text style={styles.buttonText}>END THE GAME</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
        <Text style={styles.buttonText}>RESTART</Text>
      </TouchableOpacity>
      <Card style={styles.card}>
        <Text style={styles.title}>Guess A Number Between 1 & 100</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={setUserNumber}
          value={userNumber}
        />
        <Text style={styles.infoText}>Attempts left: {attemptsLeft}</Text>
        <Text style={styles.infoText}>Timer: {timer}s</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleHint} style={styles.button}>
            <Text style={styles.buttonText}>USE A HINT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGuess} style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT GUESS</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  restartButton: {
    alignSelf: "flex-end",
    margin: 10,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  card: {
    width: "90%",
    height: 450,
    padding: 75,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginBottom: 20,
    color: Colors.primary,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: Colors.grey,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primary,
    textAlign: "center",
  },
});

export default GameScreen;
