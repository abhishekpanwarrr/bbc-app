import SettingRow from "@/components/profile/SettingRow";
import ThemeToggle from "@/components/profile/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileBox from "@/components/profile/ProfileBox";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { theme } = useTheme();
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View className="border-b border-gray-300 mb-5">
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
        </View>
        <View style={{ width: "100%" }}>
          {user?.email && <ProfileBox user={user} />}
          {!user?.email && (
            <TouchableOpacity
              onPress={() => router.push("/user/login")}
              style={{
                backgroundColor: theme.primary,
                paddingVertical: 10,
                width: "100%",
                alignItems: "center",
                borderRadius: 7,
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: theme.card,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          )}
          {/* <UserLogin /> : <ProfileBox user={user} />} */}
        </View>
        {user?.email && (
          <View>
            <SettingRow
              label="Orders"
              onPress={() => router.push("/user/orders")}
              value={<Ionicons name="chevron-forward" size={16} color={"gray"} />}
            />
            <SettingRow
              label="Payments"
              onPress={() => router.push("/user/payments")}
              value={<Ionicons name="chevron-forward" size={16} color={"gray"} />}
            />
          </View>
        )}
        <ThemeToggle />
        <SettingRow label="Help & Feedback" onPress={() => alert("Feedback form coming soon")} />
        <SettingRow label="Reset Preferences" onPress={() => alert("Reset logic later")} />
      </ScrollView>
    </SafeAreaView>
  );
}
