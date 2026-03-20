import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const actions = [
  { icon: "calendar", label: "Schedule Meeting" },
  { icon: "document-text", label: "Generate PDF" },
  { icon: "search", label: "Do Research" },
];

export default function ActionButtons() {
  return (
    <View style={styles.container}>
      {actions.map((item, i) => (
        <TouchableOpacity key={i} style={styles.button}>
          <Ionicons name={item.icon} size={18} />
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef1f4",
    padding: 12,
    borderRadius: 20,
    gap: 8,
  },
  text: {
    fontSize: 14,
  },
});