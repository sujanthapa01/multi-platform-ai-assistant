import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Header from "@/components/home/header";
import InputBar from "@/components/home/inputbar";
import Sidebar from "@/components/home/sidebar";
import ChatBubble from "@/components/home/chatbubble";
import { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TypingLoader from "@/components/home/loader";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false); 

  const scrollRef = useRef(null);

  // Load chats from storage
  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const data = await AsyncStorage.getItem("chats");
      if (data) {
        const parsed = JSON.parse(data);
        setChats(parsed);
        setActiveChatId(parsed[0]?.id || null);
      }
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  // Save chats
  const saveChats = async (newChats) => {
    setChats(newChats);
    await AsyncStorage.setItem("chats", JSON.stringify(newChats));
  };

  const activeChat = chats.find((c) => c.id === activeChatId);

  // Create new chat manually
  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };

    const updated = [newChat, ...chats];
    saveChats(updated);
    setActiveChatId(newChat.id);
  };

  // Delete chat
  const deleteChat = async (chatId) => {
    const updated = chats.filter((c) => c.id !== chatId);
    setChats(updated);
    await AsyncStorage.setItem("chats", JSON.stringify(updated));

    if (activeChatId === chatId) {
      setActiveChatId(updated[0]?.id || null);
    }
  };

  // SEND MESSAGE (NO STREAM, ADD LOADER)
  const handleSend = async (text) => {
    if (!text.trim()) return;

    let currentChats = [...chats];
    let chatId = activeChatId;

    // create chat if none exists
    if (!chatId) {
      const newChat = {
        id: Date.now().toString(),
        title: text.slice(0, 25),
        messages: [],
      };
      currentChats = [newChat, ...currentChats];
      chatId = newChat.id;
      setActiveChatId(chatId);
    }

    const chatIndex = currentChats.findIndex((c) => c.id === chatId);

    const userMsg = {
      id: Date.now(),
      text,
      isUser: true,
    };

    const aiId = Date.now() + 1;

    // Add AI placeholder with loader
    currentChats[chatIndex].messages.push(userMsg, {
      id: aiId,
      text: "",
      isUser: false,
      loading: true, // indicate loader
    });

    if (currentChats[chatIndex].title === "New Chat") {
      currentChats[chatIndex].title = text.slice(0, 25);
    }

    saveChats(currentChats);
    setChats([...currentChats]);
    setLoadingAI(true);

    try {
      const res = await fetch("http://192.168.31.45:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, mode: "conversation" }),
      });

      const data = await res.json();

      // extract text from blocks
      const aiText =
        data?.data?.blocks?.map((b) => b.text || "").join("\n") ||
        "No response";

      currentChats[chatIndex].messages = currentChats[chatIndex].messages.map(
        (msg) =>
          msg.id === aiId
            ? { ...msg, text: aiText, loading: false } // remove loader
            : msg,
      );

      setChats([...currentChats]);
      saveChats(currentChats);
    } catch (err) {
      console.log("AI ERROR:", err);
      currentChats[chatIndex].messages = currentChats[chatIndex].messages.map(
        (msg) =>
          msg.id === aiId
            ? { ...msg, text: "Error connecting to AI", loading: false }
            : msg,
      );
      setChats([...currentChats]);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onMenuPress={() => setSidebarOpen(true)} />

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
        onSelectChat={(id) => {
          setActiveChatId(id);
          setSidebarOpen(false);
        }}
        onNewChat={createNewChat}
        onDeleteChat={deleteChat}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.chatArea}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
          >
            {activeChat?.messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                isUser={msg.isUser}
                message={msg.text}
                loading={msg.loading}
                tasks={msg.tasks}
              />
            ))}
          </ScrollView>

          <InputBar onSend={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  chatArea: { flexGrow: 1, padding: 10, paddingBottom: 100 },
});
