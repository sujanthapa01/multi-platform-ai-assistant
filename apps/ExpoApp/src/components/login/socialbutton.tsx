import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Button{
    title:string,
    onPress:React.TouchEvent
}
export default function SocialButton({ title, onPress }:Button) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
});