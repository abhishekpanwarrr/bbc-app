import { useTheme } from "@/context/ThemeContext";
import { useLoyalty } from "@/store/useLoyalty";
import { Text, TouchableOpacity, View } from "react-native";

export default function RewardCard() {
  const { theme } = useTheme();
  const { stamps, totalStamps, redeem } = useLoyalty();

  const unlocked = stamps >= totalStamps;

  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 18,
        marginTop: 20,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: theme.text,
          marginBottom: 6,
        }}
      >
        Free Coffee Reward
      </Text>

      <Text style={{ color: "#777", marginBottom: 12 }}>
        {unlocked
          ? "Your reward is ready ☕"
          : `${totalStamps - stamps} more to unlock`}
      </Text>

      {unlocked && (
        <TouchableOpacity
          onPress={redeem}
          style={{
            backgroundColor: theme.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Redeem Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
