import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import LogoHeader from "@/components/login/loginheader";
import SocialButton from "@/components/login/socialbutton";
import Divider from "@/components/login/divider";
import InputField from "@/components/login/inputfeild";
import PrimaryButton from "@/components/login/primarybutton";
import FooterLinks from "@/components/login/footer";

export default function Signup() {
  return (
    <SafeAreaView style={styles.container}>
      <LogoHeader />

      <View style={styles.socialRow}>
        <SocialButton title="Google" />
        <SocialButton title="GitHub" />
      </View>

      <Divider />

      <InputField label="FULL NAME" placeholder="John Doe" />

      <InputField label="EMAIL ADDRESS" placeholder="name@example.com" />

      <InputField label="PASSWORD" placeholder="••••••••" secure />

      <InputField label="CONFIRM PASSWORD" placeholder="••••••••" secure />

      <PrimaryButton
        title="Create Account"
        onPress={() => router.push("/home")}
      />

      <FooterLinks
        type="signup"
        onAuthPress={() => router.push("/login")}
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
