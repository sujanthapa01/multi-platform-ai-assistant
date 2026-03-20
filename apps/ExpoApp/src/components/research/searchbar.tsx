import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#777" />
      <TextInput
        placeholder="Search anything..."
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef1f4",
    padding: 12,
    borderRadius: 14,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
});