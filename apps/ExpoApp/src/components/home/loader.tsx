import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function TypingLoader() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const animateDot = (dot, delay) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(dot, {
          toValue: -6,
          duration: 300,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    );
  };

  useEffect(() => {
    animateDot(dot1, 0).start();
    animateDot(dot2, 150).start();
    animateDot(dot3, 300).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
        <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
        <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginVertical: 5,
  },
  bubble: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 15,
    width: 60,
    justifyContent: "space-between",
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: "#555",
    borderRadius: 3,
  },
});