import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function FooterLinks({
  type = "login", 
  onAuthPress,
  onPrivacyPress,
  onTermsPress,
}) {
  return (
    <View style={styles.container}>
      
      {/* Auth Switch Text */}
      {type === "login" ? (
        <Text style={styles.footer}>
          Don't have an account?{" "}
          <Text style={styles.link} onPress={onAuthPress}>
            Create account
          </Text>
        </Text>
      ) : (
        <Text style={styles.footer}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={onAuthPress}>
            Sign in
          </Text>
        </Text>
      )}

      {/* Bottom Links */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={onPrivacyPress}>
          <Text style={styles.small}>PRIVACY POLICY</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onTermsPress}>
          <Text style={styles.small}>TERMS OF SERVICE</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  footer: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },

  link: {
    color: "#4a6cf7",
    fontWeight: "500",
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },

  small: {
    fontSize: 11,
    color: "#999",
  },
});