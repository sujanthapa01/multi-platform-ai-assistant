import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Ionicons name="menu" size={24} />
        <Text style={styles.logo}>OmniAI</Text>
        <View style={styles.avatar} />
      </View>

      <Text style={styles.sub}>DASHBOARD OVERVIEW</Text>
      <Text style={styles.title}>Hello, Ashish.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { fontSize: 20, fontWeight: "600" },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f2c6a0",
  },
  sub: {
    marginTop: 20,
    fontSize: 12,
    color: "#777",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 5,
  },
});