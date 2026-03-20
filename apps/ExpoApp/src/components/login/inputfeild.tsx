
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function InputField({
  label,
  placeholder,
  secure,
  rightText,
}) {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {rightText && <Text style={styles.right}>{rightText}</Text>}
      </View>

      <TextInput
        placeholder={placeholder}
        secureTextEntry={secure}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  label: { fontSize: 12, color: "#777" },

  right: { fontSize: 12, color: "#4a6cf7" },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});