import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TaskRP() {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => router.push("/pdfmaker")}>
        <View style={styles.btn}>
          <Ionicons name="document-sharp" size={25} color={"#fff"} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/schedule")}>
        <View style={styles.btn}>
          <Ionicons name="calendar" size={25} color={"#fff"} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    right: 15,
    bottom: 40,
    gap: 10,
    flex: 1,
  },
  value: {
    fontSize: 4,
    fontWeight: "400",
  },
  btn: {
    backgroundColor: "#000",
    width: 55,
    height: 55,
    alignItems: "center",
    borderRadius: 100,
    justifyContent: "center",
  },
});
