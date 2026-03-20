import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNav() {
  return (
    <View style={styles.container}>
      <NavItem icon="chatbubble" label="Chat" active />
      <NavItem icon="checkmark-done" label="Tasks" />
      <NavItem icon="search" label="Research" />
      <NavItem icon="person" label="Profile" />
    </View>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <View style={styles.item}>
      <Ionicons name={icon} size={20} color={active ? "#3b4a5a" : "#aaa"} />
      <Text style={{ color: active ? "#3b4a5a" : "#aaa" }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  item: {
    alignItems: "center",
  },
});
