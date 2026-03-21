import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import BackButton from "@/components/tasks/backbutton";

export default function PDFMaker() {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setContent("");

    try {
      const res = await fetch("http://YOUR-IP:8080/agent/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Create a detailed PDF content about ${query}`,
        }),
      });

      const data = await res.json();
      setContent(data.response || "No content generated");
    } catch (err) {
      setContent("Error generating content");
    }

    setLoading(false);
  };

  // 🔥 Generate PDF
  const handleCreatePDF = async () => {
    if (!content) return;

    const html = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>${query}</h1>
          <p>${content.replace(/\n/g, "<br/>")}</p>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    await Sharing.shareAsync(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton link={"/tasks"}/>
      <Text style={styles.title}>PDF Generator</Text>

      {/* Input */}
      <TextInput
        placeholder="Enter topic (e.g. Python basics)"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />


      <TouchableOpacity style={styles.btn} onPress={handleGenerate}>
        <Text style={styles.btnText}>Generate Content</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}


      <ScrollView style={styles.preview}>
        <Text>{content}</Text>
      </ScrollView>


      {content ? (
        <TouchableOpacity style={styles.pdfBtn} onPress={handleCreatePDF}>
          <Text style={styles.btnText}>Generate PDF</Text>
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
  },

  btn: {
    marginTop: 10,
    backgroundColor: "#4a6cf7",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  pdfBtn: {
    marginTop: 10,
    backgroundColor: "#ff3b30", 
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
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
  },
});