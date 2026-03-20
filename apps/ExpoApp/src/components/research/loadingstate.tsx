import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4a6cf7" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
  },
});