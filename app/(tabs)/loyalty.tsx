import RewardCard from "@/components/loyalty/RewardCard";
import StampGrid from "@/components/loyalty/StampGrid";
import { useTheme } from "@/context/ThemeContext";
import { useLoyalty } from "@/store/useLoyalty";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loyalty() {
  const { theme } = useTheme();
  const { stamps, totalStamps } = useLoyalty();

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

        <Text style={{ color: "#777", marginBottom: 20 }}>
          {stamps} / {totalStamps} coffees collected
        </Text>

        <StampGrid />
        <RewardCard />
      </ScrollView>
    </SafeAreaView>
  );
}
