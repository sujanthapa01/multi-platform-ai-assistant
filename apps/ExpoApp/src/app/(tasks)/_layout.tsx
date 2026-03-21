import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="pdfmaker" />
      <Stack.Screen name="schedule" />
    </Stack>
  );
}
