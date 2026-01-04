import EventCard from "@/components/community/EventCard";
import NoticeCard from "@/components/community/NoticeCard";
import { useTheme } from "@/context/ThemeContext";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Header */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: theme.text,
            marginBottom: 6,
          }}
        >
          Community ☕
        </Text>

        <Text style={{ color: "#777", marginBottom: 20 }}>What’s happening at your café</Text>

        {/* Events */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: theme.text,
            marginBottom: 12,
          }}
        >
          Upcoming Events
        </Text>

        <EventCard title="Latte Art Workshop" date="Sat, 12 Oct • 5 PM" type="Workshop" />
        <EventCard title="Open Mic Night" date="Fri, 18 Oct • 7 PM" type="Music" />

        {/* Notices */}
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: theme.text,
              marginBottom: 12,
            }}
          >
            Community Board
          </Text>

          <NoticeCard
            title="🎨 Local artists welcome"
            description="Display your artwork at the café. Ask the counter staff for details."
          />

          <NoticeCard
            title="📚 Study-friendly mornings"
            description="Quiet hours before 11 AM on weekdays."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
