import { useTheme } from "@/context/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";

export default function EventCard({
  title,
  date,
  type,
}: {
  title: string;
  date: string;
  type: string;
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
          fontSize: 16,
          fontWeight: "600",
          color: theme.text,
          marginBottom: 4,
        }}
      >
        {title}
      </Text>

      <Text style={{ color: "#777", marginBottom: 10 }}>
        {date} • {type}
      </Text>

      <TouchableOpacity
        onPress={() => alert("RSVP confirmed (mock)")}
        style={{
          alignSelf: "flex-start",
          backgroundColor: theme.primary,
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 14,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>RSVP</Text>
      </TouchableOpacity>
    </View>
  );
}
