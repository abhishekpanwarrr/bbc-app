import { useTheme } from "@/context/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

export default function OptionCard({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 16,
        borderRadius: 18,
        backgroundColor: selected ? theme.primary : theme.card,
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          color: selected ? "#fff" : theme.text,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
