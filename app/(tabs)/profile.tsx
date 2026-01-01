import PreferenceSummary from "@/components/profile/PreferenceSummary";
import SettingRow from "@/components/profile/SettingRow";
import ThemeToggle from "@/components/profile/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { useLoyalty } from "@/store/useLoyalty";
import { usePreferences } from "@/store/usePreferences";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { theme } = useTheme();
  const router = useRouter();
  const { stamps, totalStamps } = useLoyalty();
  const { prefs } = usePreferences();
  const { user } = useAuthStore();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {user?.role === "ADMIN" && (
        <Pressable onPress={() => router.push("/admin/orders")}>
          <Text>Admin Dashboard</Text>
        </Pressable>
      )}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: theme.text,
            marginBottom: 6,
          }}
        >
          Profile
        </Text>

        <Text style={{ color: "#777", marginBottom: 20 }}>
          Manage your preferences & app settings
        </Text>

        {/* Preferences */}
        <SettingRow
          label="Coffee Preferences"
          value={prefs.completed ? "Set" : "Not set"}
          onPress={() => router.push("/quiz")}
        />
        <PreferenceSummary />

        {/* Loyalty */}
        <SettingRow
          label="Loyalty Progress"
          value={`${stamps} / ${totalStamps}`}
          onPress={() => router.push("/(tabs)/loyalty")}
        />

        {/* Appearance */}
        <ThemeToggle />

        {/* Support */}
        <SettingRow
          label="Help & Feedback"
          onPress={() => alert("Feedback form coming soon")}
        />

        <SettingRow
          label="Reset Preferences"
          onPress={() => alert("Reset logic later")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
