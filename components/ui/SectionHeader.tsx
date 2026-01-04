import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";

export default function SectionHeader({ title, rightText }: { title: string; rightText?: string }) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 8,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
      <Text>{rightText}</Text>
    </View>
  );
}
