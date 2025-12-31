import { useTheme } from "@/context/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

export default function PrimaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: theme.primary,
        paddingVertical: 14,
        borderRadius: 18,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
