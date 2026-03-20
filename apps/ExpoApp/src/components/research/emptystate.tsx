import { View, Text, StyleSheet } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Search anything and AI will generate insights ✨
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
  },
  text: {
    color: "#777",
  },
});