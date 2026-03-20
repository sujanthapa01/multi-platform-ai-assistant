import { View, Text, StyleSheet } from "react-native";

export default function UpcomingItem({ title, subtitle, time }) {
  return (
    <View style={styles.card}>
      <View style={styles.leftBar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{subtitle}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },
  leftBar: {
    width: 4,
    height: "100%",
    backgroundColor: "#4a6cf7",
    marginRight: 10,
    borderRadius: 10,
  },
  title: { fontWeight: "600" },
  sub: { color: "#777", fontSize: 12 },
  time: {
    backgroundColor: "#eef1f4",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});