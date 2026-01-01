import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";

export default function QuizStep({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <View style={{ marginTop: 40 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: theme.text,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
