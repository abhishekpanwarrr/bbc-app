import PreferenceSummary from "@/components/profile/PreferenceSummary";
import SettingRow from "@/components/profile/SettingRow";
import ThemeToggle from "@/components/profile/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { useLoyalty } from "@/store/useLoyalty";
import { usePreferences } from "@/store/usePreferences";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserLogin from "@/components/profile/UserLogin";
import ProfileBox from "@/components/profile/ProfileBox";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { theme } = useTheme();
  const router = useRouter();
  const { stamps, totalStamps } = useLoyalty();
  const { prefs } = usePreferences();
  const { user } = useAuthStore();
  console.log("🚀 ~ Profile ~ user:", user);
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

        {/* User login details */}
        <View style={{ width: "100%" }}>
          {!user?.email ? <UserLogin /> : <ProfileBox user={user} />}
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
        <SettingRow label="Help & Feedback" onPress={() => alert("Feedback form coming soon")} />

        <SettingRow label="Reset Preferences" onPress={() => alert("Reset logic later")} />
      </ScrollView>
    </SafeAreaView>
  );
}

// 🔴 NOT LOGGED IN → SHOW LOGIN FORM
//   if (!user) {
//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
//         <LoginForm />
//       </SafeAreaView>
//     );
//   }

//   // 🟢 LOGGED IN (USER or ADMIN)
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
//       {/* ADMIN BUTTON */}
//       {user.role === "ADMIN" && (
//         <Pressable onPress={() => router.push("/(admin)/orders")} style={{ padding: 16 }}>
//           <Text style={{ color: "#007AFF", fontWeight: "600" }}>Admin Dashboard</Text>
//         </Pressable>
//       )}

//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         {/* Header */}
//         <Text
//           style={{
//             fontSize: 22,
//             fontWeight: "600",
//             color: theme.text,
//             marginBottom: 6,
//           }}
//         >
//           Profile
//         </Text>

//         <Text style={{ color: "#777", marginBottom: 20 }}>Welcome back, {user.name}</Text>

//         {/* Orders */}
//         <SettingRow label="My Orders" onPress={() => router.push("/(tabs)/order")} />

//         {/* Payments (placeholder for now) */}
//         <SettingRow label="My Payments" onPress={() => alert("Payments history coming soon")} />

//         {/* Preferences */}
//         <SettingRow
//           label="Coffee Preferences"
//           value={prefs.completed ? "Set" : "Not set"}
//           onPress={() => router.push("/quiz")}
//         />
//         <PreferenceSummary />

//         {/* Loyalty */}
//         <SettingRow
//           label="Loyalty Progress"
//           value={`${stamps} / ${totalStamps}`}
//           onPress={() => router.push("/(tabs)/loyalty")}
//         />

//         {/* Appearance */}
//         <ThemeToggle />

//         {/* Support */}
//         <SettingRow label="Help & Feedback" onPress={() => alert("Feedback form coming soon")} />

//         {/* Logout */}
//         <SettingRow label="Logout" onPress={logout} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
