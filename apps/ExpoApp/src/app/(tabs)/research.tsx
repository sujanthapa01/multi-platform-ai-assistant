import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import SearchBar from "@/components/research/searchbar";
import LoadingState from "@/components/research/loadingstate";
import EmptyState from "@/components/research/emptystate";
import ResultCard from "@/components/research/rescard";

export default function Research() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // 🔥 Fake AI (replace with API later)
  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setResults([]);

    setTimeout(() => {
      setResults([
        {
          title: "Summary",
          content: `AI-generated summary for "${query}"...`,
        },
        {
          title: "Key Points",
          content: "• Point 1\n• Point 2\n• Point 3",
        },
        {
          title: "Conclusion",
          content: "This is the final insight based on research.",
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />

      <ScrollView style={{ marginTop: 15 }}>
        {loading && <LoadingState />}

        {!loading && results.length === 0 && <EmptyState />}

        {!loading &&
          results.map((item, index) => (
            <ResultCard key={index} title={item.title} content={item.content} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 15,
  },
});
