import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function PrimaryButton({ title, onPress, icon }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.8}>
      
      <View style={styles.content}>
        {icon && (
          <Ionicons name={icon}  size={20} color="#fff" />
        )}
        <Text style={styles.text}>{title}</Text>
      </View>

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

  content: {
    flexDirection: "row",  
    alignItems: "center",
    gap: 8,                
  },

  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});