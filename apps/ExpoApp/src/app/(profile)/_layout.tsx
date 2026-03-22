import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="editprofile" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="nortification" />
      <Stack.Screen name="helpsupport" />
    </Stack>
  );
}
