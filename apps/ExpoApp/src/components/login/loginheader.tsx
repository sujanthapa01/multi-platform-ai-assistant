import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LogoHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Ionicons name="terminal" size={28} color="#333" />
      </View>
      <Text style={styles.title}>OmniAI</Text>
      <Text style={styles.subtitle}>
        Enter the future of productivity.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 30 },
  logoBox: {
    backgroundColor: "#dbe3f0",
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: { fontSize: 32, fontWeight: "700" },
  subtitle: { color: "#666", marginTop: 5 },
});