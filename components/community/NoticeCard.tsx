import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";

export default function NoticeCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 18,
        marginBottom: 14,
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          color: theme.text,
          marginBottom: 4,
        }}
      >
        {title}
      </Text>

      <Text style={{ color: "#777" }}>{description}</Text>
    </View>
  );
}
