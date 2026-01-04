import { useTheme } from "@/context/ThemeContext";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorite() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ padding: 16 }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: theme.text,
            marginBottom: 6,
          }}
        >
          Loyalty Rewards 🎁
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
