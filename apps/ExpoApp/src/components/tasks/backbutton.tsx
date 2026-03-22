import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function BackButton() {
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ paddingBottom: 4, }}
    >
      <Ionicons name="arrow-back-circle" size={40} />
    </TouchableOpacity>
  );
}