import { useTheme } from "@/context/ThemeContext";
import { Image, Text, TouchableOpacity } from "react-native";

export default function CoffeeCard({ name, imageUrl }: { name: string; imageUrl?: string }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.card,
        padding: 14,
        borderRadius: 18,
        width: 150,
        marginRight: 12,
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 4,
        }}
      >
        {name}
      </Text>

      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </TouchableOpacity>
  );
}
