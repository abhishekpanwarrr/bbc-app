import { useTheme } from "@/context/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";

export default function SettingRow({
  label,
  value,
  onPress,
}: {
  label: string;
  value?: string | React.ReactNode;
  onPress?: () => void;
}) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.text, fontWeight: "500" }}>{label}</Text>
        {typeof value === "string" ? (
          <Text style={{ color: "#777", marginLeft: 10 }}>{value}</Text>
        ) : (
          value
        )}
      </View>
    </TouchableOpacity>
  );
}
