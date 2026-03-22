import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function Sidebar({
  visible,
  onClose,
  chats = [],
  onSelectChat,
  onNewChat,
  onDeleteChat, 
}) {
  const translateX = useSharedValue(-width);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateX.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateX.value = withTiming(-width, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // DELETE CONFIRMATION
  const confirmDelete = (chatId) => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDeleteChat(chatId),
        },
      ]
    );
  };

  return ( 
    <View pointerEvents={visible ? "auto" : "none"} style={styles.overlay}>
      

      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>


      <Animated.View style={[styles.sidebar, sidebarStyle]}>
        
        <Text style={styles.heading}>Chats</Text>

        <TouchableOpacity style={styles.newBtn} onPress={onNewChat}>
          <Text style={styles.newText}>+ New Chat</Text>
        </TouchableOpacity>

        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>No chats yet</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() => onSelectChat(item.id)}
              onLongPress={() => confirmDelete(item.id)} 
            >
              <Text numberOfLines={1} style={styles.chatText}>
                {item.title || "New Chat"}
              </Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    zIndex: 100,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  sidebar: {
    width: width * 0.75,
    height: "100%",
    backgroundColor: "#fff",
    padding: 15,
    position: "absolute",
    left: 0,
    top: 0,
    paddingTop: 40,
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  newBtn: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  newText: {
    color: "#fff",
    fontWeight: "600",
  },

  chatItem: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f5f7fb",
  },

  chatText: {
    fontSize: 14,
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});