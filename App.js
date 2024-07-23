import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import Colors from './components/Colors';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  const handleStartGame = (name, email) => {
    setUserInfo({ name, email });
    setGameStarted(true);
  };

  const handleRestartGame = () => {
    setUserInfo({ name: '', email: '' });
    setGameStarted(false);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setTimeout(() => setGameStarted(true), 0);
  };

  return (
    <View style={styles.container}>
      {gameStarted ? (
        <GameScreen onRestart={handleRestartGame} onNewGame={handleNewGame} />
      ) : (
        <StartScreen onContinue={handleStartGame} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
