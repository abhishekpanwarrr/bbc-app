import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";

export default function Stamp({ filled }: { filled: boolean }) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: filled ? theme.primary : theme.card,
        justifyContent: "center",
        alignItems: "center",
        margin: 6,
        borderWidth: filled ? 0 : 1,
        borderColor: "#ddd",
      }}
    >
      {filled && <Text style={{ color: "#fff", fontWeight: "700" }}>☕</Text>}
    </View>
  );
}
