import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../login/primarybutton";
import { router } from "expo-router";

interface chat {
  message: string;
  isUser: boolean;
  tasks: boolean;
}

export default function ChatBubble({ message, isUser, tasks }: chat) {
  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
      <Text style={isUser ? styles.userText : styles.aiText}>{message}</Text>
      {tasks && (
        <View style={styles.tasks}>
          <PrimaryButton
            icon={"globe-sharp"}
            title={"DO RESEARCH"}
            onPress={() => router.push("/research")}
          />
          <PrimaryButton
            icon={"calendar"}
            title={"SCHEDULE MEETINGS"}
            onPress={() => router.push("/tasks")}
          />
          <PrimaryButton
            icon={"document-text"}
            title={"GENRATE PDF"}
            onPress={() => router.push("/tasks")}
          />
        </View>
      )}
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
  tasks: {
    paddingVertical: 10,
    gap: 10,
  },
});
