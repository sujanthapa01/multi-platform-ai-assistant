import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function SuggestionChip({ label }) {
  return (
    <TouchableOpacity style={styles.chip}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#eef1f4",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
});