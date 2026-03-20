import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TaskCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Focus</Text>
        <Text style={styles.badge}>3 TASKS LEFT</Text>
      </View>

      <View style={styles.task}>
        <Ionicons name="checkmark-circle" size={22} color="#4a6cf7" />
        <View>
          <Text style={styles.taskTitle}>Finalize Q3 Report</Text>
          <Text style={styles.sub}>Priority High • 2:00 PM</Text>
        </View>
      </View>

      <View style={styles.task}>
        <Ionicons name="ellipse-outline" size={22} color="#aaa" />
        <View>
          <Text style={styles.taskTitle}>Review API Docs</Text>
          <Text style={styles.sub}>Technical • 4:30 PM</Text>
        </View>
      </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: "600" },
  badge: {
    fontSize: 12,
    backgroundColor: "#e6ebff",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  task: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 8,
  },
  taskTitle: { fontWeight: "500" },
  sub: { color: "#777", fontSize: 12 },
});