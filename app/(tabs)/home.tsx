import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";

export default function Home() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.text, fontSize: 18 }}>Home Screen ☕</Text>
    </View>
  );
}
