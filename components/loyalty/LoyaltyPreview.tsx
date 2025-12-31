import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";

export default function LoyaltyPreview() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 18,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 6,
        }}
      >
        Loyalty Progress
      </Text>

      <Text style={{ color: "#777", marginBottom: 8 }}>
        7 / 10 coffees collected
      </Text>

      <View
        style={{
          height: 8,
          backgroundColor: "#E0E0E0",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: "70%",
            backgroundColor: theme.accent,
            height: "100%",
          }}
        />
      </View>
    </View>
  );
}
