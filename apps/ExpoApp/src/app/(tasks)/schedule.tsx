import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import BackButton from "@/components/tasks/backbutton";

export default function Schedule() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiEmail, setAiEmail] = useState("");

  //  Generate AI Email
  const generateEmail = async () => {
    if (!email || !topic) return;

    setLoading(true);
    setAiEmail("");

    try {
      const res = await fetch("http://:8080/agent/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Write a professional meeting email for ${topic} scheduled on ${date}`,
        }),
      });

      const data = await res.json();
      setAiEmail(data.response || "No email generated");
    } catch {
      setAiEmail("Error generating email");
    }

    setLoading(false);
  };

  // Send Email (Backend)
  const sendEmail = async () => {
    if (!aiEmail) return;

    try {
      await fetch("http://:8080/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: topic,
          message: aiEmail,
        }),
      });

      alert("Email sent successfully 🚀");
    } catch {
      alert("Failed to send email");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton link={"/tasks"} />
      <Text style={styles.title}>Schedule Meeting</Text>

      <TextInput
        placeholder="Recipient Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Meeting Topic"
        value={topic}
        onChangeText={setTopic}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text>{date.toLocaleString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === "android" ? "default" : "spinner"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);

            if (event.type === "dismissed") return;

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.btn} onPress={generateEmail}>
        <Text style={styles.btnText}>Generate AI Email</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

      {/* Preview */}
      <View style={styles.preview}>
        <Text>{aiEmail}</Text>
      </View>

      {aiEmail ? (
        <TouchableOpacity style={styles.sendBtn} onPress={sendEmail}>
          <Text style={styles.btnText}>Send Email</Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8fafc",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#eef1f4",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  btn: {
    marginTop: 15,
    backgroundColor: "#4a6cf7",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  sendBtn: {
    marginTop: 10,
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  preview: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    minHeight: 100,
  },
});
