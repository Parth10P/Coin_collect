import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

const COIN_SIZE = 28;

function isColliding(a, aW, aH, b, bW, bH) {
  return a.x < b.x + bW && a.x + aW > b.x && a.y < b.y + bH && a.y + aH > b.y;
}

export default function App() {
  const [playerX, setPlayerX] = useState((screenWidth - PLAYER_WIDTH) / 2);
  const [coins, setCoins] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const accelRef = useRef(null);

  useEffect(() => {
    Accelerometer.setUpdateInterval(80);
    const sub = Accelerometer.addListener(({ x }) => {
      const move = -x * 100;
      setPlayerX((prev) => {
        const next = prev + move;
        return Math.max(0, Math.min(screenWidth - PLAYER_WIDTH, next));
      });
    });
    accelRef.current = sub;
    return () => sub.remove();
  }, []);

  // load high score
  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem("HIGH_SCORE_COINS");
        if (v !== null) setHighScore(Number(v));
      } catch (e) {
        console.warn("Failed to load high score", e);
      }
    })();
  }, []);

  // spawn coins (paused when gameOver)
  useEffect(() => {
    if (gameOver) return;
    const spawn = setInterval(() => {
      const coin = {
        id: Date.now() + Math.random(),
        x: Math.random() * (screenWidth - COIN_SIZE),
        y: -COIN_SIZE,
      };
      setCoins((p) => [...p, coin]);
    }, 900);
    return () => clearInterval(spawn);
  }, [gameOver]);

  // move coins and detect collisions / misses
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setCoins((prev) =>
        prev
          .map((c) => ({ ...c, y: c.y + 6 }))
          .filter((c) => {
            // missed (fell off screen)
            if (c.y > screenHeight) {
              setMissCount((m) => {
                const next = m + 1;
                if (next >= 3) {
                  handleGameOver();
                }
                return next;
              });
              return false;
            }

            const playerBox = {
              x: playerX,
              y: screenHeight - PLAYER_HEIGHT - 20,
            };

            if (
              isColliding(
                { x: c.x, y: c.y },
                COIN_SIZE,
                COIN_SIZE,
                playerBox,
                PLAYER_WIDTH,
                PLAYER_HEIGHT
              )
            ) {
              // collected
              setScore((s) => {
                const next = s + 1;
                if (next > highScore) {
                  setHighScore(next);
                  AsyncStorage.setItem("HIGH_SCORE_COINS", String(next)).catch(
                    () => {}
                  );
                }
                return next;
              });
              return false;
            }

            return true;
          })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [playerX, highScore, gameOver]);

  const handleGameOver = () => {
    setGameOver(true);
    setTimeout(() => {
      setScore(0);
      setCoins([]);
      setMissCount(0);
      setGameOver(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>High: {highScore}</Text>
      </View>

      {coins.map((c) => (
        <View
          key={String(c.id)}
          style={[styles.coin, { left: c.x, top: c.y }]}
        />
      ))}

      <View style={[styles.player, { left: playerX }]} />

      <Text style={styles.instruction}>Tilt your phone to move</Text>

      {gameOver && (
        <View style={styles.overlay}>
          <Text style={styles.gameOverTitle}>Game Over</Text>
          <Text style={styles.gameOverScore}>Score: {score}</Text>
          <Text style={styles.gameOverScore}>High: {highScore}</Text>
        </View>
      )}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
  },
  topBar: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  player: {
    position: "absolute",
    bottom: 20,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    backgroundColor: "rgba(254, 254, 254, 1)",
    borderRadius: 8,
  },
  coin: {
    position: "absolute",
    width: COIN_SIZE,
    height: COIN_SIZE,
    borderRadius: COIN_SIZE / 2,
    backgroundColor: "#FFD700",
    borderWidth: 2,
    borderColor: "#CC9C00",
  },
  overlay: {
    position: "absolute",
    left: 40,
    right: 40,
    top: screenHeight / 2 - 80,
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  gameOverTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  gameOverScore: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 4,
  },
  instruction: {
    position: "absolute",
    top: 70,
    color: "#fff",
    fontFamily: "Courier",
    fontSize: 14,
  },
  scoreText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
