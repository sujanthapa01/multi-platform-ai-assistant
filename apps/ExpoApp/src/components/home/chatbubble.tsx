import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import PrimaryButton from "../login/primarybutton";
import { router } from "expo-router";
import TypingLoader from "./loader";
import Markdown from "react-native-markdown-display";
import Clipboard from "@react-native-clipboard/clipboard";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  tasks?: boolean;
  loading?: boolean; 
}

export default function ChatBubble({ message, isUser, tasks, loading }: ChatBubbleProps) {

  const copyToClipboard = () => {
    Clipboard.setString(message);
    Alert.alert("Copied!", "Message copied to clipboard.");
  };

  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
      {loading ? (
        <TypingLoader /> 
      ) : (
        <View>
            {!isUser && (
            <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
              <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
          )}
          <Markdown
            style={{
              body: isUser ? styles.userText : styles.aiText,
              code_inline: { backgroundColor: "#eaeaea", padding: 4, borderRadius: 4 },
              code_block: {
                backgroundColor: "#eaeaea",
                padding: 8,
                borderRadius: 6,
                fontFamily: "Courier",
              },
              list_item: { flexDirection: "row" },
            }}
          >
            {message}
          </Markdown>

        
        </View>
      )}

      {tasks && !loading && (
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
            title={"GENERATE PDF"}
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
  copyBtn: {
    marginBottom: 6,
    alignSelf: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#d1d5db",
    borderRadius: 6,
  },
  copyText: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "bold",
  },
});