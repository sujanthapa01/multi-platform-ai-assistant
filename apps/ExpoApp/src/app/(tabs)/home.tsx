import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "@/components/home/header";
import InputBar from "@/components/home/inputbar";
import Sidebar from "@/components/home/sidebar";
import { useState, useRef } from "react";
import ChatBubble from "@/components/home/chatbubble";
import TypingLoader from "@/components/home/loader";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("http://192.168.31.45:8080/agent/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const raw = await res.text();

      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { message: raw };
      }

      const aiMsg = {
        id: Date.now() + 1,
        text: data.message || "No response",
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (err) {
      console.log("ERROR:", err);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Error connecting to AI",
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onMenuPress={() => setSidebarOpen(true)} />

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={"height"}
      >
        <View style={{ flex: 1 }}>
          
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.chatArea}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.text}
                isUser={msg.isUser}
              />
            ))}

            {loading && <TypingLoader />}

          </ScrollView>

          <InputBar onSend={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  chatArea: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 100,
  },
});