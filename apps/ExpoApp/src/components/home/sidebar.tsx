// components/Sidebar.js
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const chats = [
  { id: "1", title: "Project Discussion" },
  { id: "2", title: "AI Research Notes" },
  { id: "3", title: "Meeting Summary" },
];

export default function Sidebar({ visible, onClose }) {
  const translateX = useSharedValue(-width); // start off-screen
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

  return (
    <View pointerEvents={visible ? "auto" : "none"} style={styles.overlay}>
      
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, sidebarStyle]}>
        <Text style={styles.heading}>Chats</Text>

        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chatItem}>
              <Text>{item.title}</Text>
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
    paddingTop:24
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  chatItem: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f5f7fb",
  },
});