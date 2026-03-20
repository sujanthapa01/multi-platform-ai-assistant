import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ onMenuPress }) {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>OmniAI</Text>
      <View style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f2c6a0",
  },
});