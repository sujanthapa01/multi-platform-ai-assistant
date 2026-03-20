import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StatCard({ icon, title, value }) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={22} color="#4a6cf7" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  title: {
    marginTop: 10,
    color: "#777",
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
  },
});