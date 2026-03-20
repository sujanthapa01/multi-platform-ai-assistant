import { View, Text, StyleSheet } from "react-native";

export default function ResultCard({ title, content }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  content: {
    color: "#555",
    lineHeight: 20,
  },
});