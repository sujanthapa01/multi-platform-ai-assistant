import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";

export default function InputBar({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons name="attach" size={20} color="#555" />

        <TextInput
          placeholder="Message OmniAI..."
          style={styles.input}
          value={text}
          onChangeText={setText}
          multiline
        />

        <Ionicons name="mic" size={20} color="#555" />

        <TouchableOpacity style={styles.send} onPress={handleSend}>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "#f8fafc",
    paddingBottom: 10,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#eef1f4",
    marginHorizontal: 10,
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
    maxHeight: 100,
  },

  send: {
    backgroundColor: "#3b4a5a",
    padding: 10,
    marginLeft: 9,
    borderRadius: 50,
  },
});