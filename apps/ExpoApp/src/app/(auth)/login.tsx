import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import LogoHeader from "@/components/login/loginheader";
import SocialButton from "@/components/login/socialbutton";
import Divider from "@/components/login/divider";
import InputField from "@/components/login/inputfeild";
import PrimaryButton from "@/components/login/primarybutton";
import FooterLinks from "@/components/login/footer";

export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <LogoHeader />

      <View style={styles.socialRow}>
        <SocialButton title="Google" />
        <SocialButton title="GitHub" />
      </View>

      <Divider />

      <InputField label="EMAIL ADDRESS" placeholder="name@example.com" />

      <InputField
        label="PASSWORD"
        placeholder="••••••••"
        secure
        rightText="FORGOT?"
      />

      <PrimaryButton
        title="Sign In to Workspace"
        onPress={() => router.push("/home")}
      />

      <FooterLinks
        type="login"
        onAuthPress={() => router.push("/signup")}
        onPrivacyPress={() => console.log("Privacy")}
        onTermsPress={() => console.log("Terms")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 20,
    justifyContent: "center",
  },
  socialRow: {
    flexDirection: "row",
    gap: 10,
  },
});
