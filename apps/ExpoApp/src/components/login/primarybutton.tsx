import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#4a5568",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});