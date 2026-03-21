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
import ChatBubble from "@/components/home/chatbubble";
import { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const scrollRef = useRef(null);

  //  Load chats from storage
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

  //  Save chats
  const saveChats = async (newChats) => {
    setChats(newChats);
    await AsyncStorage.setItem("chats", JSON.stringify(newChats));
  };

  const activeChat = chats.find((c) => c.id === activeChatId);

  //  Create new chat manually
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

  //  Delete chat
  const deleteChat = async (chatId) => {
    const updated = chats.filter((c) => c.id !== chatId);

    setChats(updated);
    await AsyncStorage.setItem("chats", JSON.stringify(updated));

    if (activeChatId === chatId) {
      setActiveChatId(updated[0]?.id || null);
    }
  };

  //  SEND MESSAGE (STREAM FIXED)
  const handleSend = async (text) => {
    if (!text.trim()) return;

    let currentChats = [...chats];
    let chatId = activeChatId;

    // FIX: create chat if none exists
    if (!chatId) {
      const newChat = {
        id: Date.now().toString(),
        title: text.slice(0, 25), // 
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

    currentChats[chatIndex].messages.push(userMsg, {
      id: aiId,
      text: "",
      isUser: false,
    });

    // Update title if still default
    if (currentChats[chatIndex].title === "New Chat") {
      currentChats[chatIndex].title = text.slice(0, 25);
    }

    saveChats(currentChats);

    try {
      const res = await fetch("http://192.168.31.45:8080/agent/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      let accumulatedText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });

        accumulatedText += chunk;

        currentChats[chatIndex].messages =
          currentChats[chatIndex].messages.map((msg) =>
            msg.id === aiId
              ? { ...msg, text: accumulatedText }
              : msg
          );

        setChats([...currentChats]);
      }

      saveChats(currentChats);
    } catch (err) {
      console.log("STREAM ERROR:", err);

      currentChats[chatIndex].messages =
        currentChats[chatIndex].messages.map((msg) =>
          msg.id === aiId
            ? { ...msg, text: "Error connecting to AI" }
            : msg
        );

      setChats([...currentChats]);
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
                message={msg.text}
                isUser={msg.isUser}
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