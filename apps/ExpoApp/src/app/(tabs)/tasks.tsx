import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import DashboardHeader from "@/components/tasks/dashboardheader";
import TaskCard from "@/components/tasks/taskscard";
import StatCard from "@/components/tasks/status";
import UpcomingItem from "@/components/tasks/up";
import SuggestionChip from "@/components/tasks/suggestion";
import TaskRP from "@/components/tasks/tasks";

export default function Tasks() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DashboardHeader />

        <TaskCard />

        <View style={styles.row}>
          <StatCard icon="time" title="MEETINGS" value="04" />
          <StatCard icon="notifications" title="REMINDERS" value="12" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
        </View>

        <UpcomingItem
          title="Product Sync"
          subtitle="with Design Team"
          time="10:00 AM"
        />

        <UpcomingItem
          title="AI Research Lab"
          subtitle="Grant Submission"
          time="1:30 PM"
        />

        {/* Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SMART SUGGESTIONS</Text>
        </View>

        <View style={styles.chips}>
          <SuggestionChip label="Reschedule Yoga" />
          <SuggestionChip label="Draft Q3 Email" />
          <SuggestionChip label="Summarize Docs" />
        </View>
      </ScrollView>
      <TaskRP />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 15,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
