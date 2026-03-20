import { View, Text, StyleSheet } from "react-native";

export default function ProfileInfoCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Workspace</Text>
      <Text style={styles.value}>OmniAI Team</Text>

      <Text style={styles.label}>Role</Text>
      <Text style={styles.value}>Full Stack Developer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
});