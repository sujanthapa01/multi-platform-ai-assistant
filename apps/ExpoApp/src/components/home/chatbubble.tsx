import { View, Text, StyleSheet } from "react-native";

export default function ChatBubble({ message, isUser }) {
  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={isUser ? styles.userText : styles.aiText}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#3b4a5a",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#eef1f4",
    alignSelf: "flex-start",
  },
  userText: { color: "#fff" },
  aiText: { color: "#333" },
});