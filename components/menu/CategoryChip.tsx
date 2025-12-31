import { useTheme } from "@/context/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

export default function CategoryChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 16,
        backgroundColor: active ? theme.primary : theme.card,
        marginRight: 10,
      }}
    >
      <Text
        style={{
          color: active ? "#fff" : theme.text,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
