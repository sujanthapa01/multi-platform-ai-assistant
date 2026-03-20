import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileMenuItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name={icon} size={20} color="#4a6cf7" />
        <Text style={styles.text}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#aaa" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 14,
  },
});