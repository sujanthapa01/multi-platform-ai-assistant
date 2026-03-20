import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function LogoutButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    padding: 15,
    borderRadius: 14,
    backgroundColor: "#ffe5e5",
    alignItems: "center",
  },
  text: {
    color: "#d11a2a",
    fontWeight: "600",
  },
});