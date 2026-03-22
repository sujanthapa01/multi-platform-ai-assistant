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
import LoadingState from "@/components/research/loadingstate";

export default function PDFMaker() {
  const [query, setQuery] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
  if (!query.trim()) return;

  setLoading(true);
  setBlocks([]);

  try {
    const res = await fetch("http://192.168.31.45:8080/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Create detailed research about ${query}`,
        mode: "pdf",
      }),
    });

    console.log("STATUS:", res.status);

    const data = await res.json();

    // console.log("RESPONSE:", data);

    setBlocks(data?.data?.blocks || data?.blocks || []);
  } catch (err) {
    console.log("ERROR:", err); 

    setBlocks([
      { type: "text", text: "Server connection error" },
    ]);
  }

  setLoading(false);
};

  const RenderBlock = ({ block }) => {
    switch (block.type) {
      case "heading":
        return (
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {block.text}
          </Text>
        );

      case "text":
        return <Text>{block.text}</Text>;

      case "list":
        return block.items.map((item, i) => (
          <Text key={i}>• {item}</Text>
        ));

      default:
        return null;
    }
  };

  const handleCreatePDF = async () => {
    let htmlContent = "";

    blocks.forEach((b) => {
      if (b.type === "heading") htmlContent += `<h2>${b.text}</h2>`;
      if (b.type === "text") htmlContent += `<p>${b.text}</p>`;
      if (b.type === "list") {
        htmlContent += "<ul>";
        b.items.forEach((i) => {
          htmlContent += `<li>${i}</li>`;
        });
        htmlContent += "</ul>";
      }
    });

    const html = `
      <html>
        <body>
          <h1>${query}</h1>
          ${htmlContent}
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AI PDF Generator</Text>

      <TextInput
        placeholder="Enter topic"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={handleGenerate}>
        <Text style={styles.btnText}>Generate</Text>
      </TouchableOpacity>

      {loading && <LoadingState />}

      <ScrollView style={styles.preview}>
        {blocks.map((b, i) => (
          <RenderBlock key={i} block={b} />
        ))}
      </ScrollView>

      {blocks.length > 0 && (
        <TouchableOpacity style={styles.pdfBtn} onPress={handleCreatePDF}>
          <Text style={styles.btnText}>Download PDF</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 22, fontWeight: "bold" },
  input: { backgroundColor: "#eee", padding: 10, marginTop: 10 },
  btn: {
    backgroundColor: "blue",
    padding: 12,
    marginTop: 10,
    alignItems: "center",
  },
  pdfBtn: {
    backgroundColor: "red",
    padding: 12,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff" },
  preview: { marginTop: 10 },
});