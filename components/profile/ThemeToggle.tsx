import { useTheme } from "@/context/ThemeContext";
import { Switch, Text, View } from "react-native";

export default function ThemeToggle() {
  const { dark, setDark, theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.text, fontWeight: "500" }}>Dark Mode</Text>
      <Switch value={dark} onValueChange={setDark} />
    </View>
  );
}
